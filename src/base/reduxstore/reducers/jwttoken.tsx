import { Update_Loginjwt } from '../types';

const default_state = 'token';

interface action {
    type: string;
    payload: any;
}

const jwttokenreducer = (state = default_state, action: action) => {
    switch (action.type) {
        case Update_Loginjwt:
            return action.payload;
        default:
            return state;
    }
};
export default jwttokenreducer;
