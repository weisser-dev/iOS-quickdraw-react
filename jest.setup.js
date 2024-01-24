// jest.setup.js
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (str) => str,
        i18n: {
            changeLanguage: () => new Promise(() => {
            }),
        },
    }),
    // If you're using the I18nextProvider, you might also need to mock this
    I18nextProvider: ({children}) => children,
    // Any other exports from react-i18next that you use should be mocked here
}));
