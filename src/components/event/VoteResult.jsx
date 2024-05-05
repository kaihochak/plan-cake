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
  film: z.string().min(1, {
    message: "You have to select at least one item.",
  }),
})


const VoteResult = ({ formData }) => {
  const [results, setResults] = useState([])
  const [checkedFilm, setCheckedFilm] = useState("")

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      film:""
    },
  })

  function onSubmit(data) {
    console.log("submit");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  /************************************************************************
   *  getVotes
   ************************************************************************/
  // const getVotes = (filmId) => {
  //   let votes = 0;
  //   let voters = [];

  //   // loop through the guestList
  //   formData.guestList.map((guest) => {
  //     if (guest.filmsVoted.includes(filmId)) {
  //       votes++;
  //       voters.push(guest.name);
  //     }
  //   })
  //   return { votes, voters };
  // }

  const getVoters = (film) => {
    if(film) {
      let voters = formData.guestList.filter(guest => 
        {
          console.log(guest,film);
          return guest.filmsVoted.some(vote => vote.id.toString() === film.id.toString())
        })
      return voters;
    } 
    return [];
  }

  const handleConfirmFilm = () => {
    console.log();

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
    console.log("New results calculated:", newResults); // Check what's being computed

    setResults(newResults);
  };
  
  useEffect(() => {
    console.log("Initial formData:", formData);
    console.log("Initial selected films:", formData.selectedFilms);
    if (formData.selectedFilms && formData.selectedFilms.length > 0) {
      populateResults();
    }
  }, [formData.selectedFilms]);    
  
  useEffect(() => {
    console.log('results', results);
  }, [results])

  /************************************************************************
   *  Rendering
   ************************************************************************/

  return (
    <div className='p-6'>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="items"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Sidebar</FormLabel>
              <FormDescription>
                Select the items you want to display in the sidebar.
              </FormDescription>
            </div>
          
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
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
      <FormMessage />
            </FormItem>
          )}
        />
      <Button 
        type="submit"
        className=""
        // onClick={handleConfirmFilm}
      >Confirm film</Button>
      </form>
    </Form>
    </div>
  )
}

export default VoteResult
