import * as types from './types';

export function callExample(arg) {
    return {
        type: types.EXAMPLE,
        arg
    };
}
