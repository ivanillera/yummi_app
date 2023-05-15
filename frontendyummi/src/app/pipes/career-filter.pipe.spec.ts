import { CareerFilterPipe } from './career-filter.pipe';

describe('CareerFilterPipe', () => {
    let pipe: CareerFilterPipe;
    const mockNote = {
        calification: [],
        comments: [
            {
                "commentCreator": "testBD",
                "content": "<Test modification PUT Request>"
            }
        ],
        _id: "638f8b429414fa0016fc26b6",
        name: "TestPostman <PUT UPDATE>",
        career: "Ing. en Sistemas de información <PUT UPDATE>",
        creator: {
            _id: "638f825a9414fa0016fc2666",
            name: "TestPostman",
            mail: "test@postman.com",
            password: "test",
            legajo: 123456,
            createdAt: "2022-12-06T17:56:42.180Z",
            updatedAt: "2022-12-06T17:56:42.180Z"
        },
        subject: "Álgebra y Geometría Analítica",
        content: "TestPostman <PUT UPDATE>",
        attached: "https://cdn.filestackcontent.com/FrSZySDRfiEzOJH87uZT",
        category: "Otros <PUT UPDATE>",
        createdAt: "2022-12-06T18:34:42.059Z",
        updatedAt: "2023-02-16T03:01:24.917Z"
    };

    beforeEach(() => {
        pipe = new CareerFilterPipe ();
    });

    it('create an instance', () => {
        const pipe = new CareerFilterPipe();
        expect(pipe).toBeTruthy();
    });

    it('should filter an array of items by id', () => {
        const filteredItems = pipe.transform(mockNote.career, ['']);
        expect(filteredItems).toEqual(mockNote.career);
    });

    it('should filter an array of items by id', () => {
        const filteredItems = pipe.transform([mockNote], ['ABC', '638f825a9414fa0016fc2666', '638f8b429414fa0016fc26b6', 'b']);
        expect(filteredItems).toEqual([]);
    });

});
