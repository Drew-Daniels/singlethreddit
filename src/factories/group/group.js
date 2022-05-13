const Group = (baseName, displayName, description, members ) => ({
    baseName,
    displayName,
    description,
    members,
    dateTimeCreated: Date.now(),
    getNamePath: () => 'g/' + baseName,

});

export default Group;
