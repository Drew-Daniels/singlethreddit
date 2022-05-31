import { useState } from 'react';
import FormComment from './Forms/FormComment';
import SortMenuDropdown from './SortMenuDropdown';
import Comments from './Comments';

export default function CommentsFeed(props) {

    const { postId } = props;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    return (
        <div>
            <FormComment />
            <SortMenuDropdown />
            <Comments comments={comments} />
        </div>
    )
}