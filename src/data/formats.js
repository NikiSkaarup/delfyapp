/*
    Basic data formats for delphi v1.0.0
*/

let types = [
    'setup',
    'questions',
    'voting',
];

let setup = {
    'type': 'setup',
    'positive': 'What was good about x',
    'negative': 'What was bad about x',
    'amount': 1,
}

let questions = {
    'type': 'questions',
    'positive': [
        {
            'id': 'a',
            'question': 'Not much light',
        }
    ],
    'negative': [
        {
            'id': 'b',
            'question': 'Too much light',
        },
    ],
}

let voting = {
    'type': 'voting',
    'votes': [
        'a',
        'b',
    ],
}

export default types;
export { types, setup, question, voting };
