import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// what is a query client?
// it is a global state management library for React
// it is used to manage the state of the app
export const queryClient = new QueryClient()

export const QueryProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider
