export const getConfig = version => {
    switch (version) {
        case 'prod-v3':
            return 'prod';
        default:
            return 'dev';
    }
};
