/*
    Basic data formats for delphi v1.0.0
*/

let types = [
    'setup',
    'feedback',
    'voting',
];

let setup = {
    'type': 'setup',
    'title': 'Name of evaluation',
    'positive': 'What was good about x',
    'negative': 'What was bad about x',
    'amount': 1,
    'general feeback': true,
};

let feedback = {
    'type': 'feedback',
    'positive': [
        {
            'id': 'a',
            'text': 'Not much light',
        }
    ],
    'negative': [
        {
            'id': 'b',
            'text': 'Too much light',
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
export { types, setup, feedback, voting };
