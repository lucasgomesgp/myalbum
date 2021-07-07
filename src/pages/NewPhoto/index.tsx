import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import "./styles.scss";

export function NewPhoto() {
    return (
        <>
            <Navbar>
                <Link to="/user/new">New</Link>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/user/aboutme">About Me</Link>
            </Navbar>
            <div className="photo-container">
                <div className="title">
                    <h2>NEW PHOTO</h2>
                </div>
                <div className="photo-area">
                    <label htmlFor="photo">Choose one image</label>
                    <Input type="file" name="photo" id="photoFile" accept="image/*" />
                    <Button className="success">
                        Send
                    </Button>
                </div>
            </div>
        </>
    );
}