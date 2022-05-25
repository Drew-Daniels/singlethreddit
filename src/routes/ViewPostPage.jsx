import { useParams } from "react-router-dom";

export default function ViewPostPage(props) {

    const { postId } = useParams();

    return (
        <main>ViewPostPage for post: {postId}</main>
    )
}