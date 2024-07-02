import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Dialog as SmallDialog, DialogContent as SmallDialogContent } from "@/components/ui/voteSelectDialog";

const FormSchema = z.object({
  film: z.string()
});

const VoteResult = ({ selectedFilms, guestList, confirmedFilm, setConfirmedFilm, showVoteResult, setShowVoteResult }) => {
  const [results, setResults] = useState([]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      film: confirmedFilm ? confirmedFilm.id.toString() : '',
    },
  });

  // Make sure the confirmed film is selected
  useEffect(() => {
    if (confirmedFilm) {
      form.reset({ film: confirmedFilm.id.toString() });
    }
  }, [confirmedFilm]);


  // Submit the form
  function onSubmit(data) {
    const confirmedFilm = selectedFilms.find(film => film.id.toString() === data.film.toString());
    setConfirmedFilm(confirmedFilm);
    setShowVoteResult(false);
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

  useEffect(() => {
    if (showVoteResult) {
      populateResults();
    }
  }, [showVoteResult]);

  /************************************************************************
   *  Rendering
   ************************************************************************/
  return (
    <>
      <SmallDialog
        open={showVoteResult}
        onOpenChange={setShowVoteResult}
      >
        <SmallDialogContent className="overflow-y-auto custom-scrollbar bg-primary text-secondary border-border w-[90%] max-w-[1024px] xl:w-[70%]">
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
                      <TableRow 
                        key={index} 
                        className={`${form.watch('film') === film.id.toString() ? 'bg-accent-dark text-accent-foreground' : ''}`}>
                        <TableCell>
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                            <FormControl>
                              <Checkbox
                                checked={form.watch('film') === film.id.toString()}
                                onCheckedChange={() => {
                                  if (form.watch('film') === film.id.toString()) {
                                    form.setValue('film', '');
                                  } else {
                                    form.setValue('film', film.id.toString())
                                  }
                                }}
                              />
                            </FormControl>
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
                <Button
                  type="submit"
                  className="w-[100%] border-none bg-accent text-primary shadow-xl"
                >
                  Confirm Film
                </Button>
              </form>
            </Form>
          </div>
        </SmallDialogContent>
      </SmallDialog>
    </>


  );
};

export default VoteResult;
