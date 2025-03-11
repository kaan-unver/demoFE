import { Show_Toast } from '../types';

interface action {
    type: string;
    payload: any;
}
const default_state = {
    id: 0,
    summary: '',
    summary_raw: '',
    message_raw: '',
    message: [],
    type: '',
    severity: '',
    date: new Date(),
    position: '',
    duration: 0
};

const showToastreducer = (state = default_state, action: action) => {
    switch (action.type) {
        case Show_Toast:
            return {
                ...state,
                id: action.payload.id,
                summary: action.payload.summary,
                summary_raw: action.payload.summary_raw,
                message: action.payload.message,
                message_raw: action.payload.message_raw,
                type: action.payload.type,
                severity: action.payload.severity,
                date: action.payload.date,
                position: action.payload.position,
                duration: action.payload.duration
            };
        default:
            return state;
    }
};
export default showToastreducer;
