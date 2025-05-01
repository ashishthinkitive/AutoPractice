const BasePage = require('./BasePage');

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      logo: '.logo',
      searchInput: '#search-input',
      searchButton: '#search-button',
      navigationMenu: '.main-nav',
      menuItems: '.main-nav .menu-item',
      loginButton: '.login-button',
      signUpButton: '.signup-button',
      featuredProducts: '.featured-products',
      productCards: '.product-card',
      footer: 'footer',
      newsletterInput: '#newsletter-email',
      subscribeButton: '#subscribe-button',
    };
  }

  /**
   * Navigate to home page
   */
  async navigateToHomePage() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Check if logo is visible
   * @returns {Promise<boolean>} True if logo is visible
   */
  async isLogoVisible() {
    return await this.isVisible(this.selectors.logo);
  }

  /**
   * Perform search
   * @param {string} searchText - Text to search
   */
  async search(searchText) {
    await this.fill(this.selectors.searchInput, searchText);
    await this.click(this.selectors.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Get menu items
   * @returns {Promise<string[]>} Menu items text
   */
  async getMenuItems() {
    const menuItemsLocator = this.page.locator(this.selectors.menuItems);
    const count = await menuItemsLocator.count();
    
    const menuItems = [];
    for (let i = 0; i < count; i++) {
      const text = await menuItemsLocator.nth(i).textContent();
      menuItems.push(text.trim());
    }
    
    return menuItems;
  }

  /**
   * Click on login button
   */
  async clickLogin() {
    await this.click(this.selectors.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Click on sign up button
   */
  async clickSignUp() {
    await this.click(this.selectors.signUpButton);
    await this.waitForPageLoad();
  }

  /**
   * Get product count
   * @returns {Promise<number>} Product count
   */
  async getProductCount() {
    return await this.getCount(this.selectors.productCards);
  }

  /**
   * Subscribe to newsletter
   * @param {string} email - Email address
   */
  async subscribeToNewsletter(email) {
    await this.fill(this.selectors.newsletterInput, email);
    await this.click(this.selectors.subscribeButton);
  }

  /**
   * Check if featured products section is visible
   * @returns {Promise<boolean>} True if featured products section is visible
   */
  async isFeaturedProductsVisible() {
    return await this.isVisible(this.selectors.featuredProducts);
  }
}

module.exports = HomePage;