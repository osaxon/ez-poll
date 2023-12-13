import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    Outlet,
    Route,
    Router,
    RouterProvider,
    rootRouteWithContext,
} from "@tanstack/react-router";
import HomePage from "./components/HomePage";
import Poll from "./components/Poll";

const rootRoute = rootRouteWithContext<{
    queryClient: typeof queryClient;
    pollId: string;
}>()({
    component: () => {
        return (
            <div
                style={{
                    maxWidth: "600px",
                    marginRight: "auto",
                    marginLeft: "auto",
                }}
            >
                <Outlet />
            </div>
        );
    },
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
});

const pollIdRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "poll/$poll_id",
    component: (ctx) => {
        const c = ctx.useParams();

        return <Poll pollId={c.poll_id} />;
    },
});

const routeTree = rootRoute.addChildren([indexRoute, pollIdRoute]);

const queryClient = new QueryClient();

const router = new Router({
    routeTree,
    context: { queryClient, pollId: "" },
});

function App() {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "ez-poll-api",
                scope: `openid profile email`,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Auth0Provider>
    );
}

export default App;
