import Container from '@mui/material/Container';
import Post from './Post';

export default function Feed(props) {

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <Post />
            <Post />
            <Post />
        </Container>
    )
}