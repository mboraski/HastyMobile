import { NavigationActions } from 'react-navigation';

import AppNavigator from '../navigations/MenuNavigator';

const authResetState = AppNavigator.router.getStateForAction(
    NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'auth' })]
    })
);

const initialState = authResetState;

const navReducer = (state: State = initialState, action: any): State => {
    switch (action.type) {
        default:
            const nextState = AppNavigator.router.getStateForAction(
                action,
                state
            );
            // Simply return the original `state` if `nextState` is null or undefined.
            return nextState || state;
    }
};

export default navReducer;
