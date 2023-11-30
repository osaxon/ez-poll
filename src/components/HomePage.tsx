/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

export default function HomePage() {
    const auth = useAuth0();
    console.log(auth);
    return auth.isLoading ? (
        "Loading..."
    ) : (
        <main className="main-content">
            <h3 className="font-bold">Welcome Home!</h3>
            <LoginButton />
            {auth.isAuthenticated && (
                <pre>
                    <code>{JSON.stringify(auth.user, null, 2)}</code>
                </pre>
            )}
        </main>
    );
}
