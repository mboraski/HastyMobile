import { saveAddress } from '../mapActions';

describe('mapActions', () => {
    it('creates saveAddress action', () => {
        expect(saveAddress('address')).toMatchSnapshot();
    });
});
