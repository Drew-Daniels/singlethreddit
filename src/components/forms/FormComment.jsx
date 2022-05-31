import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { addComment } from '../../db/comments/comments';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

export default function FormComment(props) {

    const { groupAvatarURL, selectedGroup } = props;

    const parentId = useParams().postId;
    const user = useContext(UserContext);
    const [body, setBody] = useState('');
    const toLink = user ? `/users/${user.uid}`: '/users/'
    const linkText = user ? user.displayName: 'users'

    async function handleSubmit(e) {
        e.preventDefault();
        
        await addComment(
            user,
            groupAvatarURL,
            selectedGroup,
            body,
            parentId
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Comment as {" "}
                <Link to={toLink} component={RouterLink}>{linkText}</Link>
            </h4>
            <TextField fullWidth variant='outlined' label='body' placeholder='Text (optional)' multiline rows={4} required value={body} onChange={(e) => setBody(e.target.value)} />
        </form>
    )
}