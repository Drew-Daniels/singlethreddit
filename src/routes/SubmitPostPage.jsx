import { useOutletContext } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import FormPost from '../components/Forms/FormPost';
import SiteRules from '../components/SiteRules';

export default function SubmitPostPage(props) {

    const { groups } = useOutletContext();

    return (
        <Layout mainComponent={<FormPost groups={groups} />} sidebarComponent={<SiteRules />} />
    )
}
