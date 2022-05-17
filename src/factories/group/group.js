const Group = ({
    name,
    description,
    timeCreated=Date.now(),
    members=[]
    } = {}) => {
    // run checks here
    // REQUIRED
    // name
    
    // description

    // OPTIONAL
    // timeCreated

    // members


    // return object after validation
    return (
        {
            name,
            description,
            timeCreated,
            members,
        }
    )

    function nameValid(name) {
        
    };
    function descriptionValid(description) {

    };
    function timeCreatedValid(timeCreated) {

    };
    function membersValid(members) {

    };
}

export default Group;
