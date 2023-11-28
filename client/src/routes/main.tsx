import {
  Link,
  Outlet,
  Route,
  rootRouteWithContext
} from '@tanstack/react-router'
import { queryClient } from 'components/App'
import VotePage from 'components/VotePage'
import SignInform from 'components/sign-in-form'
import { useAuth } from '../lib/index'

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { authenticated } = useAuth()

    return (
      <main className="p-2">
        <h3>Welcome Home!</h3>
        {!authenticated ? (
          <Link from="/" to="/login">
            Login
          </Link>
        ) : (
          'log out'
        )}
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
    const auth = useAuth()

    return auth.authenticated ? (
      <div>
        <h2>Dashboard</h2>
        {JSON.stringify(auth.user)}
        <Outlet />
      </div>
    ) : (
      <div>You&apos;re not logged in!</div>
    )
  }
})

const dashboardPanel = new Route({
  getParentRoute: () => protectedRoute,
  path: 'panel',
  id: 'dashboard-panel',
  component: () => <div>Dashboard panel</div>
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  protectedRoute.addChildren([dashboardPanel, voteRoute])
])
