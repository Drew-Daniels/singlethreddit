import Feed from '../components/Feed';
import Layout from '../components/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { userAvatar, groups } = useOutletContext();

    return (
        <Layout mainComponent={<Feed userAvatar={userAvatar} />} sidebarComponent={<TopGroups groups={groups} />} />
    )
}
