/*
    Basic data formats for delphi v1.0.0
*/

let types = [
    'host',
    'join',
    'feedback',
    'voting',
];

let host = {
    'type': 'host',
    'title': 'Name of evaluation',
    'positive': 'What was good about x',
    'negative': 'What was bad about x',
    'amount': 1,
    'general': 'what other feedback do you have?',
}

let join = {
    'type': 'join',
    'code': 'Sws342',
}

let feedback = {
    'type': 'feedback',
    'data': [
        {
            'id': 'a',
            'type': 'positive',
            'text': 'Not much light',
        },
        {
            'id': 'b',
            'type': 'negative',
            'text': 'Too much light',
        },
        {
            'id': 'c',
            'type': 'general',
            'text': 'meh light',
        },
    ]
}

let voting = {
    'type': 'voting',
    'data': [
        'a',
        'b',
    ],
}

export default types;
export { types, setup, feedback, voting };
