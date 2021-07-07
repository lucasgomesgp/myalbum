import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

type AuthContextProps = {
    children: ReactNode;
}
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProps) {
    const [user, setUser] = useState<User>();
   
    useEffect(() => {
        const unsbscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, photoURL, email } = user;

                if (!displayName || !photoURL || !email) {
                    throw new Error("Missing information from Google Account");
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email: email
                });
            }
        });
        return () =>{
            unsbscribe();
        } 
    }, []);

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { uid, displayName, photoURL, email } = result.user;
            console.log(uid, displayName, photoURL, email);

            if (!displayName || !photoURL || !email) {
                throw new Error("Missing information from Google Account");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                email: email
            });
        }

    }
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}