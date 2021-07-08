import { PostContainer } from "../../components/PostContainer";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./styles.scss";

export function Posts() {
    const infoPost = {
        title: "Post de teste",
        contentText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum impedit soluta modi ab aliquid eos commodi ipsam maxime veniam! Dolore ad et quaerat deserunt modi maiores, quibusdam possimus sit soluta!"
    }

    return (
        <>
            <Navbar>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/aboutme">About Me</Link>
            </Navbar>
            <div className="posts">
                <h1 className="title-posts">Posts</h1>
                {/* <PostContainer infoPost={infoPost} /> */}
            </div>
        </>
    );
}