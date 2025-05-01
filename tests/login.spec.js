const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

test.describe('Login Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    // Starting from home page and navigating to login
    await homePage.navigateToHomePage();
    await homePage.clickLogin();
  });

  test('should display login form', async () => {
    const isLoginButtonEnabled = await loginPage.isLoginButtonEnabled();
    expect(isLoginButtonEnabled).toBeTruthy();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid@example.com', 'invalidpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBe('');
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await loginPage.clickForgotPassword();
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('forgot-password');
  });

  test('should navigate to sign up page', async ({ page }) => {
    await loginPage.clickSignUp();
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('signup');
  });

  // This test would typically be marked as "slow" as it involves a successful login
  test('should login successfully with valid credentials', async ({ page }) => {
    // Note: These should be test credentials, not real user credentials
    await loginPage.login('test@example.com', 'Password123');
    
    // After successful login, we should be redirected to a dashboard or home page
    // This is a placeholder check - adjust based on your application's behavior
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).not.toContain('login');
    
    // Additional verification could check for elements visible only to logged-in users
  });
});