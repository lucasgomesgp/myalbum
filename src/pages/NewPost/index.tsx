import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../services/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "./styles.scss";

type InputPostTypes = {
    title: string;
    content: string;
};
export function NewPost() {
    const { user } = useAuth();
    const history = useHistory();

    const { handleSubmit, getFieldProps } = useFormik<InputPostTypes>({
        initialValues: {
            title: "",
            content: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title is required"),
            content: Yup.string().required("Content is required"),
        }),
        onSubmit: (values) => {
            if (!user) {
                toast.error("To create a post you must be logged in!", { position: toast.POSITION.TOP_RIGHT })
                history.push("/")
            } else {
                const postRef = database.ref("users/posts");
                postRef.push({
                    authorId: user.id,
                    title: values.title,
                    content: values.content
                });
                toast.success("Post create with success!", { position: toast.POSITION.TOP_RIGHT })
                history.push("/user/posts");
            }
        }
    });
    return (
        <>
            <Navbar>
                <Link to="/user/home">New</Link>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/user/aboutme">About Me</Link>
            </Navbar>
            <div className="post-container">
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <h2>NEW POST</h2>
                        <Input type="text" placeholder="TITLE OF POST" className="inputBg" {...getFieldProps("title")} />
                    </div>
                    <div className="post-area">
                        <textarea id="postArea" cols={30} rows={10} placeholder="Write you post here..." {...getFieldProps("content")} />
                        <Button className="success">
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}