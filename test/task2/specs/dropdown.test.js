describe('Dropdown Test', () => {
  it('should select the correct option from the dropdown', async () => {
    await browser.url('/dropdown');
    const dropdown = await $('#dropdown');
    await dropdown.selectByVisibleText('Option 2');
    await expect(dropdown).toHaveValue('2');
  });
});
