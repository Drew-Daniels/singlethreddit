import { useOutletContext } from "react-router-dom"

export default function FeedPage(props) {

    const { user } = useOutletContext();

    return (
        <main>Feed Page here</main>
    )
}