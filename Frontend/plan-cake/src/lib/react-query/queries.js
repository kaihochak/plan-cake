import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { QUERY_KEYS } from './queryKeys';
import { createEvent, createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'

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

export const useCreateEvent = () => {
    const queryClient = useQueryClient(); //
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