const BasePage = require('./BasePage');

class HeaderPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      header: 'header',
      logo: '.logo',
      navigation: 'nav',
      navigationLinks: 'nav a',
      searchIcon: '.search-icon',
      searchInput: '.search-input',
      searchButton: '.search-button',
      cartIcon: '.cart-icon',
      cartCount: '.cart-count',
      userIcon: '.user-icon',
      userDropdown: '.user-dropdown',
      loginLink: '.login-link',
      logoutLink: '.logout-link',
      profileLink: '.profile-link',
    };
  }

  /**
   * Click on logo
   */
  async clickLogo() {
    await this.click(this.selectors.logo);
    await this.waitForPageLoad();
  }

  /**
   * Get navigation links
   * @returns {Promise<string[]>} Navigation links text
   */
  async getNavigationLinks() {
    const links = this.page.locator(this.selectors.navigationLinks);
    const count = await links.count();
    
    const linkTexts = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      linkTexts.push(text.trim());
    }
    
    return linkTexts;
  }

  /**
   * Click on navigation link by text
   * @param {string} text - Link text
   */
  async clickNavigationLink(text) {
    await this.page.click(`${this.selectors.navigationLinks}:has-text("${text}")`);
    await this.waitForPageLoad();
  }

  /**
   * Search for text
   * @param {string} text - Text to search
   */
  async search(text) {
    await this.click(this.selectors.searchIcon);
    await this.fill(this.selectors.searchInput, text);
    await this.click(this.selectors.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Click on cart icon
   */
  async clickCart() {
    await this.click(this.selectors.cartIcon);
    await this.waitForPageLoad();
  }

  /**
   * Get cart count
   * @returns {Promise<number>} Cart count
   */
  async getCartCount() {
    const countText = await this.getText(this.selectors.cartCount);
    return parseInt(countText, 10) || 0;
  }

  /**
   * Click on user icon
   */
  async clickUserIcon() {
    await this.click(this.selectors.userIcon);
    await this.waitForElement(this.selectors.userDropdown);
  }

  /**
   * Click on login link in user dropdown
   */
  async clickLogin() {
    await this.clickUserIcon();
    await this.click(this.selectors.loginLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on logout link in user dropdown
   */
  async clickLogout() {
    await this.clickUserIcon();
    await this.click(this.selectors.logoutLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on profile link in user dropdown
   */
  async clickProfile() {
    await this.clickUserIcon();
    await this.click(this.selectors.profileLink);
    await this.waitForPageLoad();
  }
}

module.exports = HeaderPage;