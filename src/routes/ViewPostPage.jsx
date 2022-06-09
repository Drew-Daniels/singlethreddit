import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import CommentsFeed from '../components/CommentsFeed';
import GroupAbout from '../components/GroupAbout';
import MainLoading from "../components/Loading/MainLoading";
import SidebarLoading from "../components/Loading/SidebarLoading";
import { listenToPost } from "../db/comments/comments";

export default function ViewPostPage(props) {

    const { selectedGroup, sortField, sortDesc } = useOutletContext();
    const { baseName, description, rules, members } = selectedGroup;
    const numMembers = members.length;
    
    const postId = useParams().postId;
    const [post, setPost] = useState(null);

    useEffect(() => {
        listenToPost(postId, setPost, sortField, sortDesc);

    }, [postId, sortField, sortDesc]);

    return post ? (
        <Layout 
            mainComponent={
                <CommentsFeed 
                    post={post} 
                    selectedGroup={selectedGroup} 
                />
            } 
            sidebarComponent={<GroupAbout baseName={baseName} description={description} rules={rules} numMembers={numMembers} />} 
        />
    ) : (
        <Layout 
            mainComponent={<MainLoading />}
            sidebarComponent={<SidebarLoading />}
        />
    );
}