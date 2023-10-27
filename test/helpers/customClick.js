async function customClick(element) {
  await element.waitForDisplayed();
  await element.waitForEnabled();
  await element.click();
}

module.exports = { customClick };
