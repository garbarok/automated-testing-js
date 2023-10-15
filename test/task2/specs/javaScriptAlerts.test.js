describe('JavaScript Alerts Page Tests', () => {
  it('should show and accept JS Alert', async () => {
    await browser.url('/javascript_alerts');

    const jsAlertButton = await $('//button[text()="Click for JS Alert"]');
    await jsAlertButton.click();

    const alert = await browser.getAlertText();
    await expect(alert).toBe('I am a JS Alert');

    await browser.acceptAlert();
  });

  it('should show, accept input, and accept JS Prompt', async () => {
    await browser.url('/javascript_alerts');

    const jsPromptButton = await $('//button[text()="Click for JS Prompt"]');
    await jsPromptButton.click();

    await browser.sendAlertText('EPAM');
    await browser.acceptAlert();

    const result = await $('#result');
    expect(await result.getText()).toEqual('You entered: EPAM');
  });
});
