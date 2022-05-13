import { useParams } from 'react-router-dom';

export default function GroupPage(props) {
    
    const params = useParams();
    const { groupName } = params;

    return (
        <main>{groupName} page here</main>
    )
}
