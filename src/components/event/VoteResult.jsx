import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

const FormSchema = z.object({
  film: z.string().nonempty(),
});

const VoteResult = ({ selectedFilms, guestList, setConfirmedFilm, setShowVoteResult }) => {
  const [results, setResults] = useState([]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      film: selectedFilms.find(film => film.confirmed)?.id.toString() || "",
    },
  });

  function onSubmit(data) {
    const confirmedFilm = selectedFilms.find(film => film.id.toString() === data.film.toString());

    setConfirmedFilm(confirmedFilm);
    setShowVoteResult(false);

    toast({
      variant: "success",
      title: (
        <p className='bold'>🎬 Let's get ready to watch 🍿</p>
      ),
      description: (
        <p className='subtitle leading-[1.5]'>
          {confirmedFilm.title} ({confirmedFilm.release_date.split("-")[0]})
        </p>
      ),
    });
  }

  /************************************************************************
   *  getVotes
   ************************************************************************/

  const getVoters = (film) => {
    if (film) {
      const voters = guestList.filter(guest => guest.filmsVoted.some(vote => vote.id.toString() === film.id.toString()));
      return voters;
    }
    return [];
  };

  /************************************************************************
   *  populate results
   ************************************************************************/

  const populateResults = () => {
    const newResults = selectedFilms.map(film => {
      const voters = getVoters(film);
      return {
        id: film.id,
        title: film.title,
        votes: voters.length,
        voters,
      };
    });
    setResults(newResults);
  };

  useEffect(() => {
    if (selectedFilms && selectedFilms.length > 0) {
      populateResults();
    }
  }, [selectedFilms]);

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
              <TableHead className=""></TableHead>
              <TableHead>Films</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead className="">Voters</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {results.map((film, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={form.watch('film') === film.id.toString()}
                          onCheckedChange={() => form.setValue('film', film.id.toString())}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {/* {film.title} */}
                      </FormLabel>
                    </FormItem>
                  </TableCell>
                  <TableCell>{film.title}</TableCell>
                  <TableCell>{film.votes}</TableCell>
                  <TableCell className="">
                    {film.voters.map((voter, index) => (
                      <span key={index}>
                        {voter.name}{index < film.voters.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button type="submit" className="w-[100%] border-none bg-accent  text-primary shadow-xl">Confirm film</Button>
        </form>
      </Form>
    </div>
  );
};

export default VoteResult;
