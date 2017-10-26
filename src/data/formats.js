/**
 * Basic data formats for delphi v1.0.0
 * 
 * used as a reference for how the data types should look.
 * current state: Outdated needs to be updated
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
            'value': 'Not much light',
        },
        {
            'id': 'b',
            'type': 'negative',
            'value': 'Too much light',
        },
        {
            'id': 'c',
            'type': 'general',
            'value': 'meh light',
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
