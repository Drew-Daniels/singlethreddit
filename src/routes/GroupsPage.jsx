import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PostsFeed from '../components/PostsFeed';
import GroupMetadata from '../components/GroupMetadata';

export default function GroupsPage(props) {

    const { group } = useParams();

    return (
        <Layout 
            mainComponent={
                <PostsFeed 
                    groups={[group]} 
                />
            } 
            sidebarComponent={<GroupMetadata />} 
        />
    )
}