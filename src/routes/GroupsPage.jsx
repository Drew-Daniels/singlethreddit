import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PostsFeed from '../components/PostsFeed';
import About from '../components/About';

export default function GroupsPage(props) {

    const { group } = useParams();

    return (
        <Layout 
            mainComponent={
                <PostsFeed 
                    groups={[group]} 
                />
            } 
            sidebarComponent={<About />} 
        />
    )
}