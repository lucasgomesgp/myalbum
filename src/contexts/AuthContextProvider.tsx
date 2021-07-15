import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { firebase, auth } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
};

type AuthContextProps = {
  children: ReactNode;
};
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  logoutGoogle: () => void;
};

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
          email: email,
        });
      }
    });
    return () => {
      unsbscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { uid, displayName, photoURL, email } = result.user;
      console.log(uid, displayName, photoURL, email);

      if (!displayName || !email) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: email,
      });
    }
  }
  function logoutGoogle() {
    auth
      .signOut()
      .then(() => {
        toast.success("Sign out successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setUser(undefined);
      })
      .catch((error) => {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
      });
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logoutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
