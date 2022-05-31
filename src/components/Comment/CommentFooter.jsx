import { useState } from 'react';
import UpvoteButton from '../Buttons/UpvoteButton';
import DownvoteButton from '../Buttons/DownvoteButton';
import CommentButton from '../Buttons/CommentButton';
import FormComment from '../Forms/FormComment';

export default function CommentFooter(props) {

    const { selectedGroup, parentId } = props;

    const [commentFormOpen, setCommentFormOpen] = useState(false);

    const openCommentForm = () => setCommentFormOpen(true);
    const closeCommentForm = () => setCommentFormOpen(false);

    const onCommentButtonClick = () => {
        commentFormOpen ? closeCommentForm() : openCommentForm();
    }

    return (
        <div>
            <UpvoteButton />
            <span>0</span>
            <DownvoteButton />
            <CommentButton handleClick={onCommentButtonClick} />
            <FormComment open={commentFormOpen} selectedGroup={selectedGroup} parentId={parentId} />
        </div>
    )
}