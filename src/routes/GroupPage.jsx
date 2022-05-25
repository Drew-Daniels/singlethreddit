import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PostsFeed from '../components/PostsFeed';
import About from '../components/About';

export default function GroupPage(props) {
    
    const params = useParams();
    const { groupName } = params;

    return (
        <Layout mainComponent={<PostsFeed />} sidebarComponent={<About />} />
    )
}
