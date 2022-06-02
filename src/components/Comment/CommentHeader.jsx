import { getTimeSince } from "../../utils/time/time";

export default function CommentHeader(props) {

    const { userName, timeCreated } = props;

    return (
        <div>
            <span>{userName}{" "}</span>
            <span>{getTimeSince(timeCreated.toDate())}</span>
        </div>
    )
}