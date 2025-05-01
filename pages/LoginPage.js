const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        // Selectors
        this.usernameInput = 'input[name="username"]';
        this.passwordInput = 'input[type="password"]';
        this.loginButton = 'button:has-text("Let\'s get Started")';
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
        // Wait for navigation to complete
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = LoginPage;