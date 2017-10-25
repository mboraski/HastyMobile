import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authActions from '../../actions/authActions';

jest.mock('react-native', () => ({
    AsyncStorage: {
        getItem: jest.fn(
            () =>
                new Promise((resolve, reject) => {
                    resolve();
                })
        ),
        setItem: jest.fn(
            () =>
                new Promise((resolve, reject) => {
                    resolve();
                })
        ),
        multiGet: jest.fn(
            () =>
                new Promise((resolve, reject) => {
                    resolve();
                })
        )
    }
}));

jest.mock('expo', () => ({
    Facebook: {
        logInWithReadPermissionsAsync: jest.fn(
            () =>
                new Promise((resolve, reject) => {
                    resolve({ token: 'token' });
                })
        )
    }
}));

describe('Testing Auth Actions', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);

    beforeEach(() => {
        store.clearActions();
    });

    it('facebookLogin', async () => {
        await store.dispatch(authActions.facebookLogin());
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
    });
});
