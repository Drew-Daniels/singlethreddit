import { useState, useContext } from 'react';
import { upvote, downvote } from '../../db/comments/comments';
import UserContext from '../../contexts/UserContext';
import UpvoteButton from '../Buttons/UpvoteButton';
import DownvoteButton from '../Buttons/DownvoteButton';
import CommentButton from '../Buttons/CommentButton';
import FormComment from '../Forms/FormComment';

export default function CommentFooter(props) {

    const { selectedGroup, comment } = props;
    const user = useContext(UserContext);

    const [commentFormOpen, setCommentFormOpen] = useState(false);

    const openCommentForm = () => setCommentFormOpen(true);
    const closeCommentForm = () => setCommentFormOpen(false);
    const onCommentButtonClick = () => {
        commentFormOpen ? closeCommentForm() : openCommentForm();
    }

    return (
        <div>
            <UpvoteButton handleClick={() => upvote(user, comment)} />
            <span>{comment.karma}</span>
            <DownvoteButton handleClick={() => downvote(user, comment)} />
            <CommentButton handleClick={onCommentButtonClick} />
            <FormComment open={commentFormOpen} selectedGroup={selectedGroup} parentId={comment.id} />
        </div>
    )
}