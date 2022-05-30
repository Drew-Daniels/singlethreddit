import PostsFeed from '../components/PostsFeed';
import Layout from '../components/Layout/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { 
        groups,
        setSelectedGroup,
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
                    comments={comments} 
                    addComment={addComment}
                    getPosts={getPosts}
                    sortHot={sortHot} 
                    sortMostRecent={sortMostRecent} 
                />} 
            sidebarComponent={
                <TopGroups groups={groups} setSelectedGroup={setSelectedGroup} />} 
        />
    )
}
