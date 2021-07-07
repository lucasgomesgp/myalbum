import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import googleImg from "../../assets/images/Google.svg";
import userImg from "../../assets/images/User-Login.svg";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./styles.scss";

export function Login() {
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();
    
    async function handleLogin() {
        console.log(user);
        if (!user) {
            await signInWithGoogle();
        }
        history.push("/user/signup");
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
                <Input type="text" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button type="submit" className="button login">
                    Login
                </Button>
                <span>Don't have accout? <Link to="/user/signup" id="create-user">Create here!</Link></span>
                <p className="orLine">OR</p>
                <Button type="submit" className="button google" onClick={handleLogin}>
                    <img src={googleImg} alt="Google icon" />
                    Login with Google
                </Button>
            </main>
        </>
    );
}