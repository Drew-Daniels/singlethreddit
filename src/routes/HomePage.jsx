import Feed from '../components/Feed';
import Layout from '../components/Layout/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { user, groups, posts } = useOutletContext();

    return (
        <Layout mainComponent={<Feed user={user} posts={posts} />} sidebarComponent={<TopGroups groups={groups} />} />
    )
}
