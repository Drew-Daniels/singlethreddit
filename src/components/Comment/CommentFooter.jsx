import UpvoteButton from '../Buttons/UpvoteButton';
import DownvoteButton from '../Buttons/DownvoteButton';
import CommentButton from '../Buttons/CommentButton';

export default function CommentFooter(props) {

    return (
        <div>
            <UpvoteButton />
            <span>0</span>
            <DownvoteButton />
            <CommentButton />
        </div>
    )
}