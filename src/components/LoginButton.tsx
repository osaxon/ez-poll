import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithPopup, isAuthenticated, logout } = useAuth0();

    return isAuthenticated ? (
        <button className="" onClick={() => logout()}>
            Log Out
        </button>
    ) : (
        <button className="" onClick={() => loginWithPopup()}>
            Log In
        </button>
    );
};

export default LoginButton;
