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
    'data': {
        positive: [{
            'id': 'akj32kfkm2',
            'userId': 'eof12o23f2qkq9',
            'type': 'positive',
            'value': 'Not much light',
        }],
        negative: [{
            'id': 'b',
            'userId': 'asd12o23f2qkq9',
            'type': 'negative',
            'value': 'Too much light',
        }],
        general: [{
            'id': 'c',
            'userId': 'orf12o23f2qk19',
            'type': 'general',
            'value': 'meh light',
        }]
    }
}

let voting = {
    'type': 'voting',
    'data': {
        positive: [{
            'id': 'akj32kfkm2',
            'userId': 'eof12o23f2qkq9',
        }],
        negative: [{
            'id': 'b',
            'userId': 'asd12o23f2qkq9',
        }],
        general: [{
            'id': 'c',
            'userId': 'orf12o23f2qk19',
        }]
    }
}
