export default function CommentHeader(props) {

    const { userName } = props;

    return (
        <div>
            <span>{userName}</span>
        </div>
    )
}