import { useEffect, useState } from "react";
import { PostContainer } from "../../components/PostContainer";
import { Navbar } from "../../components/Navbar";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../services/firebase";
import deleteImg from "../../assets/images/delete_forever_black_24dp.svg";
import editImg from "../../assets/images/edit_black_24dp.svg";
import { toast } from "react-toastify";
import "./styles.scss";

type PostType = {
    id: string;
    title: string;
    content: string;
}
type FirebasePostsType = Record<string, {
    title: string;
    content: string;
}>;

export function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const history = useHistory();

    useEffect(() => {
        const postRef = database.ref("posts");

        postRef.once("value", (post) => {
            const postValue = post.val();
            const firebasePosts: FirebasePostsType = postValue ?? {};
            if (firebasePosts) {
                const postsFinal = Object.entries(firebasePosts).map(([key, value]) => {
                    return {
                        id: key,
                        title: value.title,
                        content: value.content
                    }
                });
                setPosts(postsFinal);
            }
        });
        return () => {
            postRef.off("value");
        }
    }, [posts]);
    function handleDelete(id: string) {
        if(window.confirm("Do you really want to delete this post?")){
            database.ref(`posts/${id}`).remove();
            toast.success("Delete with success!", { position: toast.POSITION.TOP_RIGHT });
        }
    }
    function handleUpdate(id: string){
        history.push(`/post/${id}`);
    }

    return (
        <>
            <Navbar>
                <Link to="/user/home">New</Link>
                <Link to="/user/posts">Posts</Link>
                <Link to="/user/photos">Photos</Link>
                <Link to="/aboutme">About Me</Link>
            </Navbar>
            <div className="posts">
                <h1 className="title-posts">Posts</h1>
                {posts.map(post => {
                    return (
                        <PostContainer key={post.id} infoPost={post}>
                            <div className="buttonsPost">
                                <button className="buttonsOperation" onClick={() => { handleDelete(post.id) }}>
                                    <img className="deleteIcon" src={deleteImg} alt="Delete post" />
                                </button>
                                <button className="buttonsOperation" onClick={() => { handleUpdate(post.id) }}>
                                    <img className="deleteIcon" src={editImg} alt="Edit post" />
                                </button>
                            </div>
                        </PostContainer>
                    );
                })
                }
            </div>
        </>
    );
}