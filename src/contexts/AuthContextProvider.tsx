import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { firebase, auth, database } from "../services/firebase";

type User =
  | {
      id: string;
      name: string;
      avatar: string | null;
      email: string;
      lastName: string | null;
      password: string | null;
    }
  | undefined;

type AuthContextProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  logoutGoogle: () => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  logoutNormal: () => void;
};
type FirebaseUsersType = Record<
  string,
  {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
    lastName: string | null;
    password: string | null;
  } | null
>;
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
          password: "",
          lastName: "",
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

      if (!displayName || !email) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: email,
        password: "",
        lastName: "",
      });
    }
  }

  function loginWithEmailAndPassword(email: string, password: string) {
    const loginRef = database.ref("users");
    let newUser: User;
    loginRef.on("value", (currentLogin) => {
      const value = currentLogin.val();
      const firebaseUsers: FirebaseUsersType = value ?? {};
      const finalUser = Object.entries(firebaseUsers).map(([key, value]) => {
        if (value?.email !== null && value?.password !== null) {
          if (value?.email === email && value?.password === password) {
            console.log("Chegou!");
            return {
              id: value.id,
              name: value.name,
              lastName: value.lastName,
              avatar: value.avatar,
              email: value.email,
              password: value.password,
            };
          }
        }
      });
      for (let i = 0; i < finalUser.length; i++) {
        if (finalUser[i]) {
          newUser = finalUser[i];
        }
      }
    });
    if (newUser) {
      setUser(newUser);
      console.log(user);
      if (user) {
        toast.success(`Welcome, ${user.name}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        loginRef.off("value");
      }
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
  function logoutNormal() {
    setUser(undefined);
    toast.success("Sign out successful!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        loginWithEmailAndPassword,
        logoutGoogle,
        logoutNormal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
