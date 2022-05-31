import { useOutletContext, useParams } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import CommentsFeed from '../components/CommentsFeed';
import About from '../components/About';

export default function ViewPostPage(props) {

    const { selectedGroup } = useOutletContext();
    const { postId } = useParams();

    return (
        <Layout mainComponent={<CommentsFeed postId={postId} selectedGroup={selectedGroup} />} sidebarComponent={<About />} />
    )
}