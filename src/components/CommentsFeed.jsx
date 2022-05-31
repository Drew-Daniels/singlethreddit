import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listenToPostComments } from '../db/comments/comments';
import FormComment from './Forms/FormComment';
import SortMenuDropdown from './SortMenuDropdown';
import Comments from './Comments';

export default function CommentsFeed(props) {

    const { postId, selectedGroup } = props;
    const params = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        listenToPostComments(postId, setComments, 'timeCreated', true);
    }, [postId])

    return (
        <div>
            {/* Post here */}
            <FormComment open={true} selectedGroup={selectedGroup} parentId={params.postId} />
            <SortMenuDropdown />
            <Comments selectedGroup={selectedGroup} comments={comments} />
        </div>
    )
}