import { useOutletContext } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import FormPost from '../components/Forms/FormPost';
import SiteRules from '../components/SiteRules';

export default function SubmitPostPage(props) {

    const { groups, groupAvatarURLs, selectedGroup, setSelectedGroup } = useOutletContext();

    return (
        <Layout 
            mainComponent={
                <FormPost 
                    groups={groups} 
                    groupAvatarURLs={groupAvatarURLs}
                    selectedGroup={selectedGroup} 
                    setSelectedGroup={setSelectedGroup}
                />
            } 
            sidebarComponent={<SiteRules />}
        />
    )
}
