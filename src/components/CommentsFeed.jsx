import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import GroupAvatarsContext from '../contexts/GroupAvatarsContext';
import PostCard from './PostCard/PostCard';
import FormComment from './Forms/FormComment';
import SortMenuDropdown from './SortMenuDropdown';
import Comments from './Comments';

export default function CommentsFeed(props) {

    const { post, selectedGroup } = props;
    const { id, children } = post;
    const user = useContext(UserContext);
    const groupAvatarURLs = useContext(GroupAvatarsContext);
    const groupAvatarURL = groupAvatarURLs[selectedGroup.baseName];
    
    return (
        <div>
            <PostCard user={user} post={post} groupAvatarURL={groupAvatarURL} />
            <FormComment open={true} selectedGroup={selectedGroup} parentId={id} />
            <SortMenuDropdown />
            <Comments selectedGroup={selectedGroup} comments={children} />
        </div>
    )
}