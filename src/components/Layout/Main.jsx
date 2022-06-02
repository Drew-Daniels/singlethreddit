import Container from '@mui/material/Container';

export default function Feed(props) {

    const { children } = props;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>{children}</Container>
    )
}