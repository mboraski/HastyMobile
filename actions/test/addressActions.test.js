import { saveAddress } from '../addressActions';

describe('addressActions', () => {
    it('creates saveAddress action', () => {
        expect(saveAddress('address')).toMatchSnapshot();
    });
});
