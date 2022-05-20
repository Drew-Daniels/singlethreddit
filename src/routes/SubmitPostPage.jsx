import Layout from '../components/Layout';
import FormPost from '../components/forms/FormPost';
import SiteRules from '../components/SiteRules';

export default function SubmitPostPage(props) {

    return (
        <Layout mainComponent={<FormPost />} sidebarComponent={<SiteRules />} />
    )
}
