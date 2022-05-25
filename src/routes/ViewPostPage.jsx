import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import CommentsFeed from '../components/CommentsFeed';
import About from '../components/About';
import { getComment, getPostComments } from "../db/comments/comments";

export default function ViewPostPage(props) {

    const { postId } = useParams();

    const [comment, setComment] = useState(null);
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        setup();

        async function setup() {
            const c = await getComment(postId);
            setComment(c);
        }
    }, [postId])

    return (
        <Layout mainComponent={<CommentsFeed />} sidebarComponent={<About />} />
    )
}