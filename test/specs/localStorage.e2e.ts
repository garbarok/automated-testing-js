import localStoragePage from "../pageobjects/localStoragePage.ts";
import { expect } from "@wdio/globals";

describe('User Preferences Cookies', () => {

    beforeEach(async () => {
        await localStoragePage.open('preference');
    });

    it('Setting user language preference', async () => {
        const languagePreferenceName = 'language';
        const languagePreferenceValue = 'Spanish';

        await localStoragePage.setUserPreference(languagePreferenceName, languagePreferenceValue);
        const retrievedPreference = await localStoragePage.getPreferenceByName(languagePreferenceName);
        
        expect(retrievedPreference.value).toBe(languagePreferenceValue);
    });

    it('Setting user theme preference', async () => {
        const themePreferenceName = 'theme';
        const themePreferenceValue = 'Dark';

        await localStoragePage.setUserPreference(themePreferenceName, themePreferenceValue);
        const retrievedPreference = await localStoragePage.getPreferenceByName(themePreferenceName);
        
        expect(retrievedPreference.value).toBe(themePreferenceValue);
    });
});
