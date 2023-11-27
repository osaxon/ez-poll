import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from 'routes/main'

export const queryClient = new QueryClient()

export const router = new Router({ routeTree, context: { queryClient } })

function App() {
  return (
    <Theme
      accentColor="mint"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="large"
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Theme>
  )
}

export default App
