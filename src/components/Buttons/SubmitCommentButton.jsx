import Button from '@mui/material/Button';

export default function SubmitCommentButton(props) {

    const { onClick } = props;

    return (
        <Button type='submit' onClick={onClick} >
            <span>Submit</span>
        </Button>
    )
}