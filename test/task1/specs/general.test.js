describe('The-Internet Website General Tests', () => {
  it('should have the correct title on landing page', async () => {
    await browser.url('/');
    await expect(browser).toHaveTitle('The Internet');
  });
});
