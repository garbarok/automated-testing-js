describe('Challenging DOM Page Tests', () => {
  it('should have the correct title', async () => {
    await browser.url('/challenging_dom');
    const title = await $('h3=Challenging DOM');
    await expect(title).toBeDisplayed();
  });
});
