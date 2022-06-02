import { useOutletContext, useParams } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import CommentsFeed from '../components/CommentsFeed';
import About from '../components/About';

export default function ViewPostPage(props) {

    const { selectedPost, selectedGroup } = useOutletContext();
    const { postId } = useParams();

    return (
        <Layout mainComponent={<CommentsFeed post={selectedPost} selectedGroup={selectedGroup} />} sidebarComponent={<About />} />
    )
}