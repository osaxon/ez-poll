/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth0 } from '@auth0/auth0-react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, Route, rootRouteWithContext } from '@tanstack/react-router'
import { queryClient } from 'components/App'
import LoginButton from 'components/LoginButton'
import VotePage from 'components/VotePage'
import SignInform from 'components/sign-in-form'
import { fetchPulse, getToken } from 'lib/fetchPulse'

const pulseQueryOptions = (getAccessTokenFn) =>
  queryOptions({
    queryKey: ['pulse'],
    queryFn: () => fetchPulse(getAccessTokenFn)
  })

const tokenQueryOptions = () =>
  queryOptions({ queryKey: ['token'], queryFn: getToken })

const rootRoute = rootRouteWithContext<{
  queryClient: typeof queryClient
}>()({
  component: () => {
    return (
      <div>
        <Outlet />
      </div>
    )
  }
})

const voteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vote',
  // load: async ({ params: { name } }) => name,
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return <VotePage name={'not working'} />
  }
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const { getAccessTokenSilently, isLoading, ...rest } = useAuth0()

    const { data } = useSuspenseQuery(pulseQueryOptions(getAccessTokenSilently))

    return isLoading ? (
      'Loading...'
    ) : (
      <main className="p-2">
        <h3>Welcome Home!</h3>
        <pre>{JSON.stringify(rest, null, 2)}</pre>
        {!rest.isAuthenticated && <LoginButton />}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    )
  }
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => {
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="space-y-4 rounded-md border p-4">
          <p className="text-xl font-bold">Sign In to your account</p>
          <SignInform />
        </div>
      </div>
    )
  },
  errorComponent: () => <div>Oops! An error occurred</div>
})

const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isAuthenticated, isLoading, user } = useAuth0()

    return isAuthenticated ? (
      <div>
        <h2>Dashboard</h2>
        <Outlet />
      </div>
    ) : isLoading ? (
      <>Loading</>
    ) : (
      <div>You&apos;re not logged in!</div>
    )
  }
})

const pulseRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/',
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getAccessTokenSilently } = useAuth0()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    async function callProtectedRoute() {
      try {
        const token = await getAccessTokenSilently()
      } catch (error) {
        console.log(error)
      }
    }

    return <button onClick={callProtectedRoute}>Call route</button>
  }
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  protectedRoute.addChildren([voteRoute, pulseRoute])
])
