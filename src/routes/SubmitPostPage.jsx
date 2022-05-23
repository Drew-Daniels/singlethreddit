import { useOutletContext } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import FormPost from '../components/Forms/FormPost';
import SiteRules from '../components/SiteRules';

export default function SubmitPostPage(props) {

    const { groups, selectedGroup, handleSelectGroup } = useOutletContext();

    return (
        <Layout mainComponent={<FormPost groups={groups} selectedGroup={selectedGroup} handleSelectGroup={handleSelectGroup} />} sidebarComponent={<SiteRules />} />
    )
}
