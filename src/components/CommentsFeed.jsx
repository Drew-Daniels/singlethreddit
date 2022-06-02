import PostCard from './PostCard/PostCard';
import FormComment from './Forms/FormComment';
import SortMenuDropdown from './SortMenuDropdown';
import Comments from './Comments';

export default function CommentsFeed(props) {

    const { post, selectedGroup } = props;

    return (
        <div>
            <PostCard post={post} />
            <FormComment open={true} selectedGroup={selectedGroup} parentId={post.id} />
            <SortMenuDropdown />
            <Comments selectedGroup={selectedGroup} comments={post.children} />
        </div>
    )
}