const URL = 'https://the-internet.herokuapp.com';

describe('The-Internet Website General Tests', () => {
  it('should have the correct title on landing page', async () => {
    await browser.url(URL);
    const pageTitle = await browser.getTitle();
    expect(pageTitle).toEqual('The Internet');
  });

  it('should load within a reasonable time frame', async () => {
    const startTime = new Date().getTime();
    await browser.url(`${URL}/large`);
    const endTime = new Date().getTime();
    const loadTime = endTime - startTime;
    await expect(loadTime).toBeLessThan(5000); // expect page to load within 5 seconds
  });
});

describe('Challenging DOM Page Tests', () => {
  it('should have the correct title', async () => {
    await browser.url(`${URL}/challenging_dom`);
    const title = await $('h3=Challenging DOM');
    await expect(title).toBeDisplayed();
  });
});

describe('Login Functionality Tests', () => {
  const user = 'tomsmith';
  const password = 'SuperSecretPassword!';
  let usernameInput;
  let passwordInput;
  let submitButton;

  beforeEach(async () => {
    await browser.url(`${URL}/login`);
    usernameInput = await $('//input[@id="username"]');
    passwordInput = await $('input[type="password"]');
    submitButton = await $('//button[@type="submit"]');
  });

  it('should allow user to login with valid credentials', async () => {
    await usernameInput.setValue(user);
    await passwordInput.setValue(password);
    await submitButton.waitForDisplayed();
    await submitButton.waitForEnabled();
    await submitButton.click();

    const welcomeMessage = await $(
      'h4=Welcome to the Secure Area. When you are done click logout below.',
    );
    const logoutButton = await $('//a[@class="button secondary radius"]');
    await expect($('#flash')).toBeDisplayed(
      'Flash message should be displayed',
    );
    await expect(welcomeMessage).toBeDisplayed(
      'Welcome message should be displayed after successful login',
    );
    await expect(logoutButton).toBeDisplayed(
      'Logout button should be displayed after successful login',
    );
    await expect(logoutButton).toHaveHrefContaining('/logout');
    await expect(logoutButton).toBeClickable(
      'Logout button should be clickable after successful login',
    );
    await expect(welcomeMessage).toBeDisplayed(
      'Welcome message should be displayed after successful login',
    );
  });

  it('should not allow login with invalid username', async () => {
    await usernameInput.setValue('invalidUser');
    await passwordInput.setValue(password);
    await submitButton.click();

    const errorMessage = await $('#flash');
    expect(await errorMessage.getText()).toContain('Your username is invalid!');
  });

  it('should not allow login with invalid password', async () => {
    await browser.url(`${URL}/login`);
    await usernameInput.setValue(user);
    await passwordInput.setValue('invalidPassword');
    await submitButton.click();

    const errorMessage = await $('#flash');
    expect(await errorMessage.getText()).toContain('Your password is invalid!');
  });

  it('should not allow login with empty username and password', async () => {
    await browser.url(`${URL}/login`);
    await submitButton.click();

    const errorMessage = await $('#flash');
    expect(await errorMessage.getText()).toContain('Your username is invalid!');
  });

  it('should not allow login with empty username', async () => {
    await browser.url(`${URL}/login`);
    await passwordInput.setValue(password);
    await submitButton.click();

    const errorMessage = await $('#flash');
    expect(await errorMessage.getText()).toContain('Your username is invalid!');
  });

  it('should not allow login with empty password', async () => {
    await browser.url(`${URL}/login`);
    await usernameInput.setValue(user);
    await submitButton.click();

    const errorMessage = await $('#flash');
    expect(await errorMessage.getText()).toContain('Your password is invalid!');
  });
});

describe('Dynamic Content Page Tests', () => {
  it('should load images correctly', async () => {
    await browser.url(`${URL}/dynamic_content`);
    const images = await $$('img');

    const isDisplayedPromises = images.map((image) => image.isDisplayed());
    const isDisplayedResults = await Promise.all(isDisplayedPromises);

    isDisplayedResults.forEach((result) => {
      expect(result).toBeTruthy();
    });
  });
});

describe('JavaScript Alerts Page Tests', () => {
  it('should show and accept JS Alert', async () => {
    await browser.url(`${URL}/javascript_alerts`);

    const jsAlertButton = await $('//button[text()="Click for JS Alert"]');
    await jsAlertButton.click();

    const alert = await browser.getAlertText();
    expect(alert).toEqual('I am a JS Alert');

    await browser.acceptAlert();
  });

  it('should show, accept input, and accept JS Prompt', async () => {
    await browser.url(`${URL}/javascript_alerts`);

    const jsPromptButton = await $('//button[text()="Click for JS Prompt"]');
    await jsPromptButton.click();

    await browser.sendAlertText('EPAM');
    await browser.acceptAlert();

    const result = await $('#result');
    expect(await result.getText()).toEqual('You entered: EPAM');
  });
});
