import Layout from '../components/Layout/Layout';
import Feed from '../components/Feed';
import About from '../components/About';

export default function GroupsPage(props) {

    return (
        <Layout mainComponent={<Feed />}  sidebarComponent={<About />} />
    )
}