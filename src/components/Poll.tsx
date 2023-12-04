import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import VotePage from "./VotePage";

export default function Poll() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                setToken(accessToken);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        if (!isLoading) {
            fetchToken();
        }
    }, [getAccessTokenSilently, isLoading]);

    if (isLoading) return "loading...";

    return (
        <VotePage
            name={user?.name as string}
            userId={user?.sub as string}
            token={token}
        />
    );
}
