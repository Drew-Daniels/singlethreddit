import { getTree } from "./arrays";

const data = [
    {
        parentId: '',
        id: '1',
    },
    {
        parentId: '1',
        id: '2',
    },
    {
        parentId: '1',
        id: '3',
    },
    {
        parentId: '2',
        id: '4',
    },
    {
        parentId: '3',
        id: '5',
    },
]

const expectedTree = [
    {
        id: '1',
        parentId: '',
        children: [
            {
                id: '2',
                parentId: '1',
                children: [
                    {
                        id: '4',
                        parentId: '2',
                        children: [],
                    }
                ]
            },
            {
                id: '3',
                parentId: '1',
                children: [
                    {
                        id: '5',
                        parentId: '3',
                        children: [],
                    }
                ]
            }
        ]
    }
]

describe('getTree', () => {
    it('creates a tree', () => {
        expect(getTree(data)).toEqual(expectedTree);
    });
});
