import { Navbar } from "../../components/Navbar";
import postIcon from "../../assets/images/plus-square.svg";
import photoIcon from "../../assets/images/add_photo_alternate.svg";
import "./styles.scss";

export function Home() {
    return (
        <>
            <Navbar>
                <li>Posts</li>
                <li>Photos</li>
                <li>About Me</li>
            </Navbar>
            <main className="choices">
                <section className="post">
                    <img src={postIcon} alt="New post" />
                    <h2>New post</h2>
                </section>
                <section className="photo">
                    <img src={photoIcon} alt="New photo" />
                    <h2>New Photo</h2>
                </section>
            </main>
        </>         
    );
}