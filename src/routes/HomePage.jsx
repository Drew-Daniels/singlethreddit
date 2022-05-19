import Grid from '@mui/material/Grid';
import Feed from '../components/Feed';
import Layout from '../components/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { userAvatar } = useOutletContext();

    console.log(Feed);

    return (
        <Layout mainComponent={<Feed />} sidebarComponent={<TopGroups />} />
    )
}
