import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { createUserAccount } from '../appwrite/api'

// useMutation hook to connect to the Appwrite API and create a new user account
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user) => createUserAccount(user),
    });
}

// useMutation hook to connect to the Appwrite API and create a new user account
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user) => signInAccount(user),
    });
}