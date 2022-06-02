import PostsFeed from '../components/PostsFeed';
import Layout from '../components/Layout/Layout';
import TopGroups from '../components/TopGroups';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { 
        groups,
        setSelectedGroup,
        posts,
        setSelectedPost,
        sortHot, 
        sortMostRecent 
    } = useOutletContext();

    return (
        <Layout 
            mainComponent={
                <PostsFeed 
                    posts={posts} 
                    setSelectedPost={setSelectedPost}
                    sortHot={sortHot} 
                    sortMostRecent={sortMostRecent} 
                    setSelectedGroup={setSelectedGroup}
                    groups={groups}
                />} 
            sidebarComponent={
                <TopGroups groups={groups} setSelectedGroup={setSelectedGroup} />} 
        />
    )
}
