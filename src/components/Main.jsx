import Container from '@mui/material/Container';

export default function Feed(props) {

    const { children } = props;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>{children}</Container>
    )
}