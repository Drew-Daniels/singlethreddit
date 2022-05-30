import { useParams, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listenToGroupComments } from '../db/comments/comments';
import Layout from '../components/Layout/Layout';
import PostsFeed from '../components/PostsFeed';
import About from '../components/About';

export default function GroupPage(props) {
    
    const params = useParams();
    const { groupName } = params;
    const { 
        groups,
        addComment, 
        getPosts,
        sortHot, 
        sortMostRecent 
    } = useOutletContext();

    const [groupComments, setGroupComments] = useState([]);

    useEffect(() => {
        const group = groups.filter(g => g.baseName === groupName);
        listenToGroupComments(group, setGroupComments);
    }, [groups, groupName])


    return (
        <Layout 
            mainComponent={<PostsFeed addComment={addComment} getPosts={getPosts} comments={groupComments} sortHot={sortHot} sortMostRecent={sortMostRecent} />} 
            sidebarComponent={<About />} 
        />
    )
}
