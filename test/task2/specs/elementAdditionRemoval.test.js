/* eslint-disable no-undef */
describe('Add/Remove Elements Page Test', () => {
  it('should add and remove elements correctly', async () => {
    await browser.url(
      'https://the-internet.herokuapp.com/add_remove_elements/',
    );

    const addElementButton = await $('//button[text()="Add Element"]');

    // Click the "Add Element" button twice
    await customClick(addElementButton);
    await customClick(addElementButton);

    // Verify that two "Delete" buttons have been added
    const deleteButtons = await $$('button.added-manually');
    expect(deleteButtons.length).toBe(2);

    // Remove the elements
    await customClick(deleteButtons[0]);
    await customClick(deleteButtons[1]);

    // No "Delete" buttons remain
    const remainingDeleteButtons = await $$('//button[text()="Delete"]');
    expect(remainingDeleteButtons.length).toBe(0);
  });
});
