import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import GroupAvatarsContext from '../../contexts/GroupAvatarsContext';
import { addComment } from '../../db/comments/comments';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import SubmitCommentButton from '../Buttons/SubmitCommentButton';

export default function FormComment(props) {

    const { open, selectedGroup } = props;

    const parentId = useParams().postId;
    const user = useContext(UserContext);
    const groupAvatarURL = useContext(GroupAvatarsContext)[selectedGroup.baseName];
    const [body, setBody] = useState('');
    const toLink = user ? `/users/${user.uid}`: '/users/'
    const linkText = user ? user.displayName: 'users'


    async function handleSubmit(e) {
        e.preventDefault();
        
        await addComment(
            user,
            groupAvatarURL,
            selectedGroup.baseName,
            body,
            parentId
        );
    }

    return (
        <Container>
            {open &&
                <form onSubmit={handleSubmit}>
                    <h4>Comment as {" "}
                        <Link to={toLink} component={RouterLink}>{linkText}</Link>
                    </h4>
                    <TextField fullWidth variant='outlined' label='body' placeholder='Text (optional)' multiline rows={4} required value={body} onChange={(e) => setBody(e.target.value)} />
                    <SubmitCommentButton onClick={handleSubmit} />
                </form>
            }
        </Container>
        
    )
}