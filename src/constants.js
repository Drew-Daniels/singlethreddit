const COMMENTS_COLLECTION_NAME = 'comments';
const GROUPS_COLLECTION_NAME = 'groups';
const GROUP_AVATARS_STORAGE_FOLDER_NAME = 'group-avatars';
const GROUP_BANNERS_STORAGE_FOLDER_NAME = 'group-banners';
const POST_MEDIA_STORAGE_FOLDER_NAME = 'post-media';

const KILOBYTE = 1000;
const MAX_POST_MEDIA_SIZE_BYTES = KILOBYTE * 15;
const MAX_GROUP_AVATAR_IMAGE_SIZE_BYTES = KILOBYTE * 15;
const MAX_GROUP_BANNER_IMAGE_SIZE_BYTES = KILOBYTE * 250;

const TEST_GROUP_1 = {
    baseName: 'bicycles',
    displayName: 'Bicycles',
    description: 'We like BIKES!',
}
const TEST_GROUP_2 = {
    baseName: 'brewing',
    displayName: 'Brewing',
    description: 'A place to discuss the art and science of Brewing',
}
const TEST_GROUP_3 = {
    baseName: 'cooking',
    displayName: 'Cooking',
    description: 'For all things cooking - techniques, recipes, and disparaging Gordan Ramsey.',
}

const TEST_GROUPS = [ TEST_GROUP_1, TEST_GROUP_2, TEST_GROUP_3 ];

export {
    COMMENTS_COLLECTION_NAME,
    GROUPS_COLLECTION_NAME,
    GROUP_AVATARS_STORAGE_FOLDER_NAME,
    GROUP_BANNERS_STORAGE_FOLDER_NAME,
    POST_MEDIA_STORAGE_FOLDER_NAME,
    MAX_POST_MEDIA_SIZE_BYTES,
    MAX_GROUP_AVATAR_IMAGE_SIZE_BYTES,
    MAX_GROUP_BANNER_IMAGE_SIZE_BYTES,
    TEST_GROUPS,
}