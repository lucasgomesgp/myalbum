import { Navbar } from "../../components/Navbar";
import postIcon from "../../assets/images/plus-square.svg";
import photoIcon from "../../assets/images/add_photo_alternate.svg";
import { Link } from "react-router-dom";
import "./styles.scss";

export function Home() {
    return (
        <>
            <Navbar>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/aboutme">About Me</Link>
            </Navbar>
            <main className="choices">
                <Link to="/user/newpost">
                    <section className="post">
                        <img src={postIcon} alt="New post" />
                        <h2>
                            New post
                        </h2>
                    </section>
                </Link>
                <Link to="/user/newphoto">
                    <section className="photo">
                        <img src={photoIcon} alt="New photo" />
                        <h2>
                            New Photo
                        </h2>
                    </section>
                </Link>
            </main>
        </>
    );
}