import auth from '../authReducer';

describe('Testing Auth Reducer', () => {
    it('reducer example', () => {
        const mockAuthObject = {};
        expect(
            auth(mockAuthObject, { type: 'facebook_login_success', payload: 'token' })
        ).toMatchSnapshot();
    });
});
