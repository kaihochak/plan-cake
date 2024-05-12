import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  film: z.string().nonempty(),
})

// VoteResult component
const VoteResult = ({ formData, setFormData, setShowVoteResult }) => {
  const [results, setResults] = useState([])
  const confirmedId = formData.confirmedFilm?.id?.toString();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      film: confirmedId,
    },
  })

  function onSubmit(data) {
    let confirmedFilm = formData.selectedFilms.filter((film) => film.id.toString() === data.film.toString())[0];

    setFormData((previous) => ({
      ...previous,
      confirmedFilm
    }))
    setShowVoteResult(false)

    toast({
      variant: "success",
      title: (
        <p className='bold'>🎬 Let's get ready to watch 🍿</p>
      ),
      description: (
        <p className='subtitle leading-[1.5]'>
          {confirmedFilm.title} ({confirmedFilm.release_date.split("-")[0]})</p>
      ),
    })

  }

  /************************************************************************
   *  getVotes
   ************************************************************************/

  const getVoters = (film) => {
    if (film) {
      let voters = formData.guestList.filter(guest => {
        console.log(guest, film);
        return guest.filmsVoted.some(vote => vote.id.toString() === film.id.toString())
      })
      return voters;
    }
    return [];
  }

  /************************************************************************
   *  populate results
   ************************************************************************/
  const populateResults = () => {
    const newResults = formData.selectedFilms.map(film => {
      const voters = getVoters(film);
      console.log("Voters for film", film, ":", voters);
      return {
        id: film.id,
        title: film.title,
        votes: voters.length,
        voters
      };
    });
    setResults(newResults);
  };

  useEffect(() => {
    console.log("Initial formData:", formData);
    console.log("Initial selected films:", formData.selectedFilms);
    if (formData.selectedFilms && formData.selectedFilms.length > 0) {
      populateResults();
    }
  }, [formData.selectedFilms]);

  /************************************************************************
   *  Rendering
   ************************************************************************/

  return (
    <div className='p-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Table for the results */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Films</TableHead>
                      <TableHead>Votes</TableHead>
                      <TableHead className="text-right">Voters</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* map over the formData.selectedFilms */}
                    {results.map((film, index) => (
                      <TableRow key={index}>
                        <TableCell className="">
                          <FormField
                            key={film.id}
                            control={form.control}
                            name="film"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={film.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value === film.id.toString()}
                                      onCheckedChange={() => field.onChange(film.id.toString())}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {film.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        </TableCell>
                        <TableCell>{film.title}</TableCell>
                        <TableCell>{film.votes}</TableCell>
                        <TableCell className="text-right">{film.voters.map((voter, index) => (
                          <span key={index}>{voter.name}{index < film.voters.length - 1 ? ', ' : ''}</span>
                        ))}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
          <Button type="submit">Confirm film</Button>
        </form>
      </Form>
    </div>
  )
}

export default VoteResult
