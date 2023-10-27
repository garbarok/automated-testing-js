import Page from "./page.ts";


class LocalStoragePage extends Page {
  
    async setUserPreference(name: string, value: string) {
        await browser.setCookies([{ name, value }]);
    }

    async getPreferenceByName(name: string) {
        const cookies = await browser.getCookies([name]);
        return cookies[0];
    }
}

export default new LocalStoragePage();
