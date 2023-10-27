/* eslint-disable no-undef */
describe('Checkboxes Test', () => {
  it('should toggle checkboxes correctly', async () => {
    await browser.url('/checkboxes');

    const checkboxes = await $$('input[type="checkbox"]');

    const toggleCheckbox = async (checkbox) => {
      const initialSelectedState = await checkbox.isSelected();

      await customClick(checkbox);
      expect(await checkbox.isSelected()).toBe(!initialSelectedState);
      await customClick(checkbox);
      expect(await checkbox.isSelected()).toBe(initialSelectedState);
    };
    await Promise.all(checkboxes.map(toggleCheckbox));
  });
});
