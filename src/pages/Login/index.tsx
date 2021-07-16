import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import googleImg from "../../assets/images/Google.svg";
import userImg from "../../assets/images/User-Login.svg";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import "./styles.scss";
import { toast } from "react-toastify";

type InputsLoginType ={
    email: string;
    password: string;
};


export function Login() {
    const { user, signInWithGoogle, loginWithEmailAndPassword } = useAuth();
    const history = useHistory();
    const { getFieldProps, handleSubmit } = useFormik<InputsLoginType>({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) =>{
            loginWithEmailAndPassword(values.email, values.password);
            if(user){
                history.push("/user/home");
            }else {
                toast.error("User not found", { position: toast.POSITION.TOP_RIGHT });
            }
        }
    });
    async function handleLoginWithGoogle() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push("/user/home");
    }

    return (
        <>
            <Navbar>
                <Link to="/faq">FAQ</Link>
            </Navbar>
            <main className="container-login">
                <div className="logo-user">
                    <img src={userImg} alt="User icon" />
                </div>
                <form id="loginWithEmail" onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Email" {...getFieldProps("email")} />
                    <Input type="password" placeholder="Password" {...getFieldProps("password")} />
                    <Button type="submit" className="button login">
                        Login
                    </Button>
                </form>
                <span>Don't have account? <Link to="/user/signup" id="create-user">Create here!</Link></span>
                <p className="orLine">OR</p>
                <Button type="submit" className="button google" onClick={handleLoginWithGoogle}>
                    <img src={googleImg} alt="Google icon" />
                    Login with Google
                </Button>
            </main>
        </>
    );
}