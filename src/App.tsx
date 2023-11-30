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

const rootRoute = rootRouteWithContext<{
    queryClient: typeof queryClient;
}>()({
    component: () => {
        return (
            <div>
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

const routeTree = rootRoute.addChildren([indexRoute]);

const queryClient = new QueryClient();

const router = new Router({
    routeTree,
    context: { queryClient },
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
