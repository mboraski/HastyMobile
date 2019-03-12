import { rtdb, firebaseAuth } from '../../firebase';

export const OPEN_FEEDBACK_REQUEST = 'open_feedback_request';
export const OPEN_FEEDBACK_SUCCESS = 'open_feedback_success';
export const OPEN_FEEDBACK_ERROR = 'open_feedback_error';

const OPEN_FEEDBACK_REF = 'consumerOpenFeedback';

export const sendOpenFeedback = (message, timestamp) => async dispatch => {
    dispatch({ type: OPEN_FEEDBACK_REQUEST });
    try {
        if (firebaseAuth.currentUser) {
            const uid = firebaseAuth.currentUser.uid;
            const openFeedbackRef = rtdb.ref(`${OPEN_FEEDBACK_REF}/${uid}`);
            const newFeedback = await openFeedbackRef.push();
            await newFeedback.set({ message, timestamp });
            dispatch({ type: OPEN_FEEDBACK_SUCCESS });
        }
    } catch (error) {
        console.warn(error);
        dispatch({ type: OPEN_FEEDBACK_ERROR, payload: error });
        // Sentry log Error
    }
};
