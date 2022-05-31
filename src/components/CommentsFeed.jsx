import { useState, useEffect } from 'react';
import { listenToPostComments } from '../db/comments/comments';
import FormComment from './Forms/FormComment';
import SortMenuDropdown from './SortMenuDropdown';
import Comments from './Comments';

export default function CommentsFeed(props) {

    const { postId, selectedGroup } = props;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        listenToPostComments(postId, setComments, 'timeCreated', true);
    }, [postId])

    return (
        <div>
            <FormComment open={true} selectedGroup={selectedGroup} />
            <SortMenuDropdown />
            <Comments selectedGroup={selectedGroup} comments={comments} />
        </div>
    )
}