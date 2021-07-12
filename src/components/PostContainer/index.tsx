import { ReactNode } from "react";
import "./styles.scss";

type PostElementsTypes = {
    children?: ReactNode;
    infoPost: {
        id: string;
        title: string;
        content: string;
    }
};

export function PostContainer({ children, infoPost }: PostElementsTypes) {

    return (
        <div className="container-post">
            <h1>{infoPost.title}</h1>
            <div className="content-text">
                <h3>{infoPost.content}</h3>
                {children}
            </div>
        </div>
    );
}