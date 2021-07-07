import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import "./styles.scss";

export function NewPost() {
    return (
        <>
            <Navbar>
                <Link to="/user/new">New</Link>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/user/aboutme">About Me</Link>
            </Navbar>
            <div className="post-container">
                <div className="title">
                    <h2>NEW POST</h2>
                    <Input type="text" placeholder="TITLE OF POST" className="inputBg" />
                </div>
                <div className="post-area">
                    <textarea name="post" id="postArea" cols={30} rows={10} placeholder="Write you post here...">
                    </textarea>
                    <Button className="success">
                        Send
                    </Button>
                </div>
            </div>
        </>
    );
}