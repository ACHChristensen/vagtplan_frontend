import { useState } from "react";
import { loginClient } from "../services/loginClient";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (username: string, password: string) => {
    try {
        setLoading(true);
        setError(null);

        const token = await loginClient.signIn(username, password);

        // store the token
        localStorage.setItem("token", token);

        return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.response) {
            setError(err.response.data); // backend sends string messages
        } else {
            setError("Something went wrong");
        }

        return false;
    } finally {
        setLoading(false);
    }
};

    return { signIn, loading, error };
}
