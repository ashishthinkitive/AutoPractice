const BasePage = require('./BasePage');

/**
 * Admin Login Page - handles login functionality
 */
class AdminLoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      usernameInput: '[name="email"]', 
      passwordInput: '[name="password"]',
      loginButton: 'button[type="submit"]',
      errorMessage: '.error-message',
      forgotPasswordLink: 'a:has-text("Forgot password")',
    };
  }

  /**
   * Navigate to admin login page
   */
  async navigateToLoginPage() {
    await this.navigate('/auth/login');
    await this.waitForPageLoad();
  }

  /**
   * Login with credentials
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.fill(this.selectors.usernameInput, username);
    await this.fill(this.selectors.passwordInput, password);
    await this.click(this.selectors.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Get error message if login fails
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    if (await this.isVisible(this.selectors.errorMessage)) {
      return await this.getText(this.selectors.errorMessage);
    }
    return '';
  }

  /**
   * Click on forgot password link
   */
  async clickForgotPassword() {
    await this.click(this.selectors.forgotPasswordLink);
    await this.waitForPageLoad();
  }
}

module.exports = AdminLoginPage;