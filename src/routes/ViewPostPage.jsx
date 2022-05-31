import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import CommentsFeed from '../components/CommentsFeed';
import About from '../components/About';

export default function ViewPostPage(props) {

    const { comments, groups, selectedGroup, setSelectedGroup } = useOutletContext();
    const { postId } = useParams();

    useEffect(() => {
        const comment = comments.filter(comment => comment.id === postId)[0];
        const newSelectedGroup = groups.filter(group => group.baseName === comment.baseName)[0]
        setSelectedGroup(prev => newSelectedGroup);

    }, [comments, postId, groups, setSelectedGroup]);

    return (
        <Layout mainComponent={<CommentsFeed postId={postId} selectedGroup={selectedGroup} />} sidebarComponent={<About />} />
    )
}