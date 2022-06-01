import Comments from '../Comments';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CommentHeader from './CommentHeader';
import CommentMain from './CommentMain';
import CommentFooter from './CommentFooter';

export default function Comment(props) {

    const { body, timeCreated, userName, userAvatarURL, selectedGroup, id, parentId, children } = props;
    return (
        <Container maxWidth='false'>
            <Card>
                <Avatar src={userAvatarURL} />
                <CommentHeader userName={userName} />
                <CommentMain body={body} />
                <CommentFooter selectedGroup={selectedGroup} parentId={id} />
                {children &&
                    <Comments comments={children} selectedGroup={selectedGroup} />
                }
            </Card>
        </Container>
    )
}