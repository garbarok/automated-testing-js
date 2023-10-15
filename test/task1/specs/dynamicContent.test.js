describe('Dynamic Content Page Tests', () => {
  it('should load images correctly', async () => {
    await browser.url('/dynamic_content');
    const images = await $$('img');

    const isDisplayedPromises = images.map((image, index) => image.isDisplayed().then(result => {
      expect(result).toBe(true, `Image at index ${index} is not visible`);
    }));

    await Promise.all(isDisplayedPromises);
  });
});
