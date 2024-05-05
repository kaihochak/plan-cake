import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const VoteResult = ({ formData }) => {
  const [results, setResults] = useState([])

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
              <TableCell className=""> <Checkbox /></TableCell>
              <TableCell>{film.title}</TableCell>
              <TableCell>{film.votes}</TableCell>
              <TableCell className="text-right">{film.voters.map((voter, index) => (
                <span key={index}>{voter.name}{index < film.voters.length - 1 ? ', ' : ''}</span>
              ))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className="">Confirm film</Button>
    </div>
  )
}

export default VoteResult
