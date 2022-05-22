import Layout from '../components/Layout/Layout';
import FormPost from '../components/Forms/FormPost';
import SiteRules from '../components/SiteRules';

export default function SubmitPostPage(props) {

    return (
        <Layout mainComponent={<FormPost />} sidebarComponent={<SiteRules />} />
    )
}
