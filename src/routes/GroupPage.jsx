import { useParams, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGroupBannerURL } from '../utils/storage/storage';
import Layout from '../components/Layout/Layout';
import PostsFeed from '../components/PostsFeed';
import GroupMetadata from '../components/GroupMetadata';

export default function GroupPage(props) {
    
    const params = useParams();
    const { groupName } = params;

    const { 
        posts,
        groups,
        sortHot, 
        sortMostRecent, 
    } = useOutletContext();

    const [bannerURL, setBannerURL] = useState('');

    useEffect(() => {
        loadBanner();

        async function loadBanner() {
            getGroupBannerURL(groupName)
                .then((url) => {
                    setBannerURL(url);
                })
        }
        
    }, [groupName])

    return (
        <Layout 
            mainComponent={
                <PostsFeed 
                    posts={posts} 
                    sortHot={sortHot} 
                    sortMostRecent={sortMostRecent} 
                    groups={groups.filter(group  => group.baseName === groupName)}
                />
            } 
            sidebarComponent={<GroupMetadata />}
            bannerURL={bannerURL}
        />
    )
}
