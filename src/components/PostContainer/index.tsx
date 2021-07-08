import "./styles.scss";

type PostElementsTypes = {
    infoPost: {
        title: string;
        contentText: string;
    }
};

export function PostContainer({ infoPost }: PostElementsTypes) {
    return (
        <div className="container-post">
            <h1>{infoPost.title}</h1>
            <h3>{infoPost.contentText}</h3>
        </div>
    );
}