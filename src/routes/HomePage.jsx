import PostsFeed from '../components/PostsFeed';
import Layout from '../components/Layout/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { 
        user, 
        groups, 
        groupAvatarURLs,
        comments, 
        addComment, 
        getPosts,
        sortHot, 
        sortMostRecent 
    } = useOutletContext();

    return (
        <Layout 
            mainComponent={
                <PostsFeed 
                    user={user}
                    comments={comments} 
                    addComment={addComment}
                    getPosts={getPosts}
                    sortHot={sortHot} 
                    sortMostRecent={sortMostRecent} 
                    groupAvatarURLs={groupAvatarURLs}
                />} 
            sidebarComponent={
                <TopGroups user={user} groups={groups} groupAvatarURLs={groupAvatarURLs} />} 
        />
    )
}
