import { Outlet, Route, rootRouteWithContext } from '@tanstack/react-router'
import { queryClient } from 'components/App'
import VotePage from 'components/VotePage'
import SignInform from 'components/sign-in-form'

const rootRoute = rootRouteWithContext<{
  queryClient: typeof queryClient
}>()({
  component: () => {
    return (
      <>
        <div className="flex gap-2 p-2 text-lg">
          <Outlet />
        </div>
      </>
    )
  }
})

const voteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vote/$name',
  // load: async ({ params: { name } }) => name,
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams()
    return <VotePage name={params.name || 'not working'} />
  }
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
})

const authRoute = new Route({
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
  }
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  voteRoute,
  authRoute
])
