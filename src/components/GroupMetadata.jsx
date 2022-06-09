import GroupAbout from "./GroupAbout";
import Rules from './Rules/Rules';

export default function GroupMetadata({baseName, description, rules, numMembers}) {

    return (
        <>
            <GroupAbout description={description} numMembers={numMembers}/>
            <Rules baseName={baseName} rules={rules} />
        </>
    )
}