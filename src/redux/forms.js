import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

export const FeedbackList = (state = {
    errMess: null,
    feedbackList: []
    }, action) =>  {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state, isLoading: false, errMess: null, feedbackList: action.payload};
        case ActionTypes.FEEDBACK_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feedbackList: []};
        case ActionTypes.APPEND_FEEDBACK:
            var feedback = action.payload;
            return { ...state, isLoading: false, errMess: null, feedbackList: state.feedbackList.concat(feedback)};        
        default:
            return state;
    }
}