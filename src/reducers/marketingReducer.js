const initialState = {
    signUpAddPaymentMethodText:
        'We recommend adding a payment method now for a more streamlined checkout experience.',
    authLoadingMessages: [
        'Checking authentication status...',
        'Using mind reading powers...',
        'Hmm...the force is strong with you...',
        'Thinking really hard...'
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
