import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from './queryKeys';
import { createPickAFilm, getPickAFilm, updatePickAFilm, updatePickAFilmGuestList, createEvent, createUserAccount, getUserEvents, signInAccount, signOutAccount } from '../appwrite/api'

// Auth
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};


/***************************************************
 * PickAFilm
 ***************************************************/

export const useCreatePickAFilm = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pickAFilm) => createPickAFilm(pickAFilm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PICKAFILMS,
      });
    },
  });
};

export const useGetPickAFilmById = (pickAFilmId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PICKAFILM_BY_ID, pickAFilmId],
    queryFn: () => getPickAFilm(pickAFilmId),
    enabled: !!pickAFilmId,
  });
};

export const useUpdatePickAFilm = () => {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pickAFilm) => updatePickAFilm(pickAFilm),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PICKAFILM_BY_ID, data?.$id], 
      });
    },
  });
}


export const useUpdatePickAFilmGuestList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateDocument) => updatePickAFilmGuestList(updateDocument),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PICKAFILM_BY_ID, data?.$id],
      });
    },
  });
}

// Event
export const useCreateEvent = () => {
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn: (event) => createEvent(event),
    onSuccess: () => {
      // Invalidate and refetch, so we don't have to wait for the next interval
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RECENT_EVENTS,
      });
    },
  });
};

export const useGetEventById = (eventId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetUserEvents = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_EVENTS, userId], // Unique key for this query
    queryFn: () => getUserEvents(userId), // Fetch the user's events
    enabled: !!userId, // Only fetch if we have a userId
  });
};


// FILMS
export const useGetFilmById = (filmId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FILM_BY_ID, filmId],
    queryFn: () => fetchFilmDetails(filmId),
    enabled: !!filmId,
  });
};
