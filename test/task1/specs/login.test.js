describe('Login Functionality Tests', () => {
  const user = 'tomsmith';
  const password = 'SuperSecretPassword!';
  let usernameInput;
  let passwordInput;
  let submitButton;

  beforeEach(async () => {
    await browser.url('/login');
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

    const logoutButton = await $('//a[@class="button secondary radius"]');

    await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/secure');
    await expect($('#flash')).toBeDisplayed(
      'Flash message should be displayed',
    );
    await expect(logoutButton).toBeDisplayed(
      'Logout button should be displayed after successful login',
    );
    await expect(logoutButton).toHaveHrefContaining('/logout');
    await expect(logoutButton).toBeClickable(
      'Logout button should be clickable after successful login',
    );
  });

  it('should not allow login with invalid username', async () => {
    await usernameInput.setValue('invalidUser');
    await passwordInput.setValue(password);
    await submitButton.click();

    const errorMessage = await $('#flash');
    await expect(errorMessage).toHaveTextContaining('Your username is invalid!');
  });

  it('should not allow login with invalid password', async () => {
    await browser.url('/login');
    await usernameInput.setValue(user);
    await passwordInput.setValue('invalidPassword');
    await submitButton.click();

    const errorMessage = await $('#flash');
    await expect(errorMessage).toHaveTextContaining('Your password is invalid!');
  });

  it('should not allow login with empty username and password', async () => {
    await browser.url('/login');
    await submitButton.click();

    const errorMessage = await $('#flash');
    await expect(errorMessage).toHaveTextContaining('Your username is invalid!');
  });

  it('should not allow login with empty username', async () => {
    await browser.url('/login');
    await passwordInput.setValue(password);
    await submitButton.click();

    const errorMessage = await $('#flash');
    await expect(errorMessage).toHaveTextContaining('Your username is invalid!');
  });

  it('should not allow login with empty password', async () => {
    await browser.url('/login');
    await usernameInput.setValue(user);
    await submitButton.click();

    const errorMessage = await $('#flash');
    await expect(errorMessage).toHaveTextContaining('Your password is invalid!');
  });
});
