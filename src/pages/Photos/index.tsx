import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./styles.scss";

export function Photos() {
    return (
        <>
            <Navbar>
                <Link to="/user/home">New</Link>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/aboutme">About Me</Link>
            </Navbar>
            <div className="content-photos">
                <h1>Photos</h1>
            </div>
        </>
    );
}