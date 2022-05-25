import PostsFeed from '../components/PostsFeed';
import Layout from '../components/Layout/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { user, groups, comments, setComments, sortHot, sortMostRecent } = useOutletContext();

    return (
        <Layout 
            mainComponent={
                <PostsFeed 
                    user={user}
                    comments={comments} 
                    setComments={setComments}
                    sortHot={sortHot} 
                    sortMostRecent={sortMostRecent} 
                />} 
            sidebarComponent={
                <TopGroups groups={groups} 
            />} 
        />
    )
}
