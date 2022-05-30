import { useOutletContext } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import FormPost from '../components/Forms/FormPost';
import SiteRules from '../components/SiteRules';

export default function SubmitPostPage(props) {

    const { user, groups, groupAvatarURLs, selectedGroup, handleSelectGroup, addComment } = useOutletContext();

    return (
        <Layout 
            mainComponent={
                <FormPost 
                    user={user}
                    groups={groups} 
                    groupAvatarURLs={groupAvatarURLs}
                    selectedGroup={selectedGroup} 
                    handleSelectGroup={handleSelectGroup}
                    addComment={addComment}
                />
            } 
            sidebarComponent={<SiteRules />}
        />
    )
}
