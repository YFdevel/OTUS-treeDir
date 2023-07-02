const mock = require('mock-fs');
const path = require('path');
const start = require('./index');

let dirTestPath = "1";
const getFixturePath = (dir) => path.resolve(__dirname, '__fixtures__', dir);

beforeAll(() => {
    dirTestPath = getFixturePath(dirTestPath);
});


describe('script using mock', () => {
    beforeAll(() => {
        mock({
            'folderName': {
                'index.md': 'Hello world!',
                'innerFolderName':{
                    'test.txt':'Successful'
                }
            },
        });
    });

    afterAll(() => {
        mock.restore();
    });

it('compiling index goes as expected using mock', () => {
    const dir = `${process.cwd()}/folderName`
    const expectedResult = { dirCounter: 1, fileCounter: 2 };
    const result =   start(dir,3);
    expect(result).toEqual(expectedResult);
});

});


describe('start', () => {

    it('compiling index goes as expected', () => {
        expect(start(dirTestPath,6)).toEqual({ dirCounter: 6, fileCounter: 5 });
        expect(start(dirTestPath,2)).toEqual({ dirCounter: 5, fileCounter: 1 });
    });

    it('the start with wrong parameters fails return null', () => {
        expect(start()).toBeNull();
        expect(start(dirTestPath, -2)).toBeNull();
        expect(start(dirTestPath, "wrong")).toBeNull();
        expect(start(dirTestPath)).toBeNull();
    });



});