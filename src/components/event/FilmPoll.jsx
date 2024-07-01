import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilmCard from "@/components/film/FilmCard";
import FilmSearch from "@/components/film/FilmSearch";
import { Dialog, DialogContent } from "@/components/ui/filmSearchDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog as SmallDialog, DialogContent as SmallDialogContent } from "@/components/ui/voteSelectDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/sortSelect";
import VoteResult from "@/components/event/VoteResult";
import GuestSelection from "@/components/event/GuestSelection";
import { PiFilmStripBold } from "react-icons/pi";
import { useUpdatePickAFilm } from "@/lib/react-query/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { LuVote } from "react-icons/lu";


// FilmPoll component
const FilmPoll = ({
  id,
  selectedFilms, selectedGuest, guestList, confirmedFilm,
  setSelectedFilms, setSelectedGuest, setGuestList, setConfirmedFilm,
  showVoteResult, setShowVoteResult, isOpen, onStateChange
}) => {
  const { toast } = useToast();
  const [showFilmSearch, setShowFilmSearch] = useState(false);
  const [showGuestSelection, setShowGuestSelection] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sortedFilms, setSortedFilms] = useState(null);
  const [votedFilms, setVotedFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const host = localStorage.getItem("host");

  // Query
  const { mutateAsync: updatePickAFilm, isLoading } = useUpdatePickAFilm();

  // if it's the host, set the host to be the current user
  useEffect(() => {
    if (host && !selectedGuest) setSelectedGuest("0");
  }, [host]);

  // sort the films, when selectedFilms is updated
  useEffect(() => {
    // https://stackoverflow.com/questions/62617690/array-shows-empty-but-should-have-one-element
    // not sure why if not setting a delay, the array would be empty with one element, leading to not populating the films
    setLoading(true);
    setTimeout(() => {
      handleSortChange(sortOrder, selectedFilms);
      setLoading(false);
    }, 200);
  }, [selectedFilms, sortOrder]);

  // set the voted films, when the selected guest changes
  useEffect(() => {
    setVotedFilms(
      guestList?.find((guest) => guest.id === selectedGuest)?.filmsVoted
    );
    handleSortChange(sortOrder, selectedFilms);
  }, [selectedGuest]);

  /**********************************************************************************
   * Guest Selection
   * ******************************************************************************/

  const GuestSelectionModal = () => {
    return (
      <AlertDialog
        open={showGuestSelection}
        onOpenChange={setShowGuestSelection}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Who are you voting as?</AlertDialogTitle>
          <div className="p-6">
            <GuestSelection
              id={id}
              guestList={guestList}
              selectedGuest={selectedGuest}
              setSelectedGuest={setSelectedGuest}
              setGuestList={setGuestList}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  /**********************************************************************************
   * Votes
   * ******************************************************************************/

  // Update the guestList to DB
  const handleUpdateGuestList = async (newGuestList) => {
    // convert guestList back to string before sending to the DB
    newGuestList = newGuestList.map((guest) => JSON.stringify(guest));

    // send the new guest to the DB
    let updatedGuestList = await updatePickAFilm({
      id: id,
      guestList: newGuestList,
    });

    // show a toast message
    if (!updatedGuestList) {
      toast({
        variant: "destructive",
        title: <p className="subtitle">🚨 Error adding guest</p>,
        description: (
          <p className="bold leading-[1.5]">
            There was an error adding{" "}
            <span className="italic subtitle">${newGuest.name}</span> to the
            guest list.
          </p>
        ),
      });
      return false;
    } else {
      return true;
    }
  };

  const handleVotedFilmsOptimistic = async (allVotedFilms) => {
    // store existing guestList
    const existingGuestList = guestList;

    // update the voted films in local state
    setVotedFilms(allVotedFilms);

    // get the new guestList with the updated voted films
    const newGuestList = guestList.map((guest) => {
      if (guest.id === selectedGuest) {
        return { ...guest, filmsVoted: allVotedFilms };
      }
      return guest;
    });

    // update the guestList in parent state
    setGuestList(newGuestList);

    // update the guestList in the DB
    const success = await handleUpdateGuestList(newGuestList);

    // if there was an error, revert the guestList in local state
    if (!success) {
      setGuestList(existingGuestList);
    }

    // update the sorted films
    handleSortChange(sortOrder, selectedFilms);
  };

  const getVotes = (film) => {
    let count = guestList.filter((guest) =>
      guest.filmsVoted?.some(
        (vote) => vote.id.toString() === film.id.toString()
      )
    ).length;
    return count;
  };

  /**********************************************************************************
   * Film Search
   * ******************************************************************************/

  // update the selectedFilms to DB
  const handleUpdateSelectedFilms = async (newSelectedFilms) => {
    // only send the id of the films to the DB
    newSelectedFilms = newSelectedFilms.map((film) => film.id);

    // send the new selectedFilms to the DB
    let updatedSelectedFilms = await updatePickAFilm({
      id: id,
      selectedFilms: newSelectedFilms,
    });

    // show a toast message
    if (!updatedSelectedFilms) {
      toast({
        variant: "destructive",
        title: <p className="subtitle">🚨 Error adding film</p>,
        description: (
          <p className="bold leading-[1.5]">
            There was an error adding the film to the selected films.
          </p>
        ),
      });
      return false;
    } else {
      return true;
    }
  };

  // handle search apply, prompt to user selection
  const handleSearchApplyOptimistic = async (newData) => {
    // close the search modal
    setShowFilmSearch(false);

    // store existing selectedFilms
    const existingSelectedFilms = selectedFilms;
    // get the new selected films
    const newSelectedFilms = newData.selectedFilms;

    // set parent state
    setSelectedFilms(newSelectedFilms);

    // send to the DB
    const success = await handleUpdateSelectedFilms(newSelectedFilms);

    // if there was an error, revert the selectedFilms in local state
    if (!success) {
      setSelectedFilms(existingSelectedFilms);
    }
  };

  /**********************************************************************************
   * Sorting
   *******************************************************************************/

  const sortByVotedFilmsByCurrentUser = (sortedItems) => {
    if (!sortedItems || !votedFilms) return sortByVotes(sortedItems);

    // Split films into voted and unvoted
    let voted = [];
    let unvoted = [];
    sortedItems.forEach((item) => {
      if (votedFilms.some((vote) => vote.id.toString() === item.id.toString()))
        voted.push(item);
      else unvoted.push(item);
    });

    // Sort unvoted films by highest to lowest votes of all users
    voted = sortByVotes(voted);
    unvoted = sortByVotes(unvoted);

    // Return voted films first, then unvoted films
    return [...voted, ...unvoted];
  };

  const sortByVotes = (sortedItems) => {
    return sortedItems.sort((a, b) => {
      const aVotes = getVotes(a);
      const bVotes = getVotes(b);
      if (aVotes === bVotes) return 0;
      return aVotes > bVotes ? -1 : 1;
    });
  };

  const sortFilms = (sortBy, sortedItems) => {
    switch (sortBy) {
      case "Default":
        sortedItems = sortByVotedFilmsByCurrentUser(sortedItems); // Sort from voted to not voted
        break;
      case "Votes: High to Low":
        sortedItems = sortByVotes(sortedItems);
        break;
      case "Rating: High to Low":
        sortedItems = sortedItems.sort(
          (a, b) => b.vote_average - a.vote_average
        ); // if b > a, b comes first
        break;
      case "Rating: Low to High":
        sortedItems = sortedItems.sort(
          (a, b) => a.vote_average - b.vote_average
        ); // if a > b, b comes first
        break;
      case "Year: New to Old":
        sortedItems = sortedItems.sort(
          (a, b) =>
            parseInt(b.release_date.split("-")[0]) -
            parseInt(a.release_date.split("-")[0])
        );
        break;
      case "Year: Old to New":
        sortedItems = sortedItems.sort(
          (a, b) =>
            parseInt(a.release_date.split("-")[0]) -
            parseInt(b.release_date.split("-")[0])
        );
        break;
      default:
        sortedItems = sortByVotedFilmsByCurrentUser(sortedItems); // Sort from voted to not voted
        break;
    }

    return sortedItems;
  };

  const handleSortChange = (value, films) => {
    if (!films || films.length === 0) return;

    let sortedItems = sortFilms(value, films);
    if (value === "Default") value = "";

    setSortedFilms(sortedItems);
    setSortOrder(value);
  };

  /**********************************************************************************
   * Film Display
   *******************************************************************************/

  const FilmDisplay = () => {
    return (
      <div className="flex flex-col p-2 my-2 rounded-sm gap-y-2 md:gap-y-3 md:p-3 bg-primary-light">
        {/* Buttons */}
        <div className="flex flex-row items-center self-end gap-2 md:gap-4 jusitfy-end ">
          <Button
            variant="outline"
            className="button-sizing"
            onClick={() => setShowVoteResult(true)}
          >
            <div className="w-full flex-center gap-x-2 tour-confirm">
              <p className="small">Confirm Film</p>
              <LuVote className="w-5 h-5 mb-[0.5]" />
            </div>
          </Button>

          <Select
            value={sortOrder}
            onValueChange={(value) => handleSortChange(value, selectedFilms)}
          >
            <SelectTrigger className={`${sortOrder ? "text-accent-foreground bg-accent" : ""}`}>
              {/* <SelectValue placeholder="" /> */}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="Votes: High to Low">
                Votes: High to Low
              </SelectItem>
              <SelectItem value="Year: Old to New">Year: Old to New</SelectItem>
              <SelectItem value="Year: New to Old">Year: New to Old</SelectItem>
              <SelectItem value="Rating: High to Low">
                Rating: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Film Cards */}
        <div className="grid grid-cols-3 gap-4 xl:gap-6 sm:grid-cols-4 md:grid-cols-5 tour-vote">
          {loading &&
            !sortedFilms &&
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative flex flex-col gap-y-2">
                <Skeleton className="aspect-w-1 aspect-h-[1.5] bg-primary-dark" />
              </div>
            ))}

          {sortedFilms?.length === 0 ||
            (sortedFilms === null && (
              <div className="col-span-5 py-32 mx-auto md:py-36 text-primary-foreground h3">
                No film selected
              </div>
            ))}

          {sortedFilms?.map((item) => (
            <div key={item.id}>
              <FilmCard
                item={item}
                selectedFilms={votedFilms}
                setSelectedFilms={handleVotedFilmsOptimistic}
                voteDisabled={!selectedGuest}
                setShowGuestSelection={!selectedGuest && setShowGuestSelection}
                votes={getVotes(item)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**********************************************************************************
   * Rendering
   * ******************************************************************************/
  return (
    <div className="flex flex-col md:gap-2">
      {/* Title */}
      <div className="flex items-end justify-between">
        <div className="subtitle text-foreground-dark">Film Poll</div>

        <div className="relative tour-add-film">
          <Button
            variant="accent"
            className="button-sizing"
            onClick={() => {
              if (selectedGuest) {
                setShowFilmSearch(true);
                onStateChange(true);
              } else {
                setShowGuestSelection(true);
              }
              // setTourState({
              //   run: false,
              //   step: 0,
              // });
            }}
          >
            <p className="body">Add Film</p>
          </Button>
          {/* ping animation */}
          <div
            className={`${selectedFilms?.length > 0
              ? ""
              : "absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-accent2 animate-ping opacity-75"
              } `}
          ></div>
          <div
            className={`${selectedFilms?.length > 0
              ? ""
              : "absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-accent2"
              }`}
          ></div>
        </div>
      </div>

      {/* Film poll */}
      <FilmDisplay />

      {/* FilmSearch */}
      <FilmSearch
        showFilmSearch={showFilmSearch}
        setShowFilmSearch={setShowFilmSearch}
        selectedFilms={selectedFilms}
        handleApply={handleSearchApplyOptimistic}
        protectedFilms={selectedFilms}
        setModalOpen={setShowFilmSearch}
      />

      {/* Guest Selection Modal */}
      <GuestSelectionModal />

      {/* Vote Result Modal */}

      {/* Vote Result */}
      <VoteResult
        selectedFilms={selectedFilms}
        guestList={guestList}
        confirmedFilm={confirmedFilm}
        setConfirmedFilm={setConfirmedFilm}
        showVoteResult={showVoteResult}
        setShowVoteResult={setShowVoteResult}
      />
    </div>
  );
};
export default FilmPoll;
