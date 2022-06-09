import Card from '@mui/material/Card';

export default function GroupAbout({description, numMembers}) {

    return (
        <Card>
            <div>{description}</div>
            <div>{numMembers + ' members online'}</div>
        </Card>
    )
}