import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { saveAddress, setCurrentLocation } from '../mapActions';
import mockApi from '../../mocks/googleMapsApi';

describe('mapActions', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);

    beforeEach(() => {
        store.clearActions();
        mockApi.reset();
    });

    it('creates saveAddress action', () => {
        expect(saveAddress('address')).toMatchSnapshot();
    });
    it('setCurrentLocation', async () => {
        mockApi.onAny().reply(200, { data: 'data' });
        await store.dispatch(setCurrentLocation({ latitude: 0, longitude: 0 }));
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
    });
});
