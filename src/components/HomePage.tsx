/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoginButton from "./LoginButton";

export default function HomePage() {
    const { getAccessTokenSilently, isAuthenticated, ...rest } = useAuth0();

    const { data: apiData } = useQuery({
        queryKey: ["api-request-data"],
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            const { data } = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/poll/${rest.user?.sub}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return data;
        },
        enabled: isAuthenticated,
    });

    return rest.isLoading ? (
        "Loading..."
    ) : (
        <main className="main-content">
            <h3 className="font-bold">Welcome Home!</h3>
            <LoginButton />
            {isAuthenticated && (
                <>
                    <pre>
                        <code>{JSON.stringify(rest.user, null, 2)}</code>
                    </pre>
                    <div>
                        <p>API data:</p>
                        <pre>
                            <code>{JSON.stringify(apiData, null, 2)}</code>
                        </pre>
                    </div>
                </>
            )}
        </main>
    );
}
