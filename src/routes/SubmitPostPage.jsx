import Layout from '../components/Layout';
import FormPost from '../components/forms/FormPost';
import Rules from '../components/Rules/Rules';

export default function SubmitPostPage(props) {

    return (
        <Layout mainComponent={<FormPost />} sidebarComponent={<Rules />} />
    )
}
