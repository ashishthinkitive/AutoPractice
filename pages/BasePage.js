/**
 * Base Page class that provides common functionality for all page objects
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to URL
   * @param {string} url - URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get current URL
   * @returns {Promise<string>} Current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Click on element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - Input selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Type text with keyboard
   * @param {string} selector - Input selector
   * @param {string} text - Text to type
   */
  async type(selector, text) {
    await this.page.type(selector, text);
  }

  /**
   * Get text from element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} Element text
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} True if element is visible
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {Object} options - Wait options
   */
  async waitForElement(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible', ...options });
  }

  /**
   * Select option from dropdown
   * @param {string} selector - Dropdown selector
   * @param {string} value - Option value
   */
  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./reports/screenshots/${name}.png` });
  }

  /**
   * Hover over element
   * @param {string} selector - Element selector
   */
  async hover(selector) {
    await this.page.hover(selector);
  }

  /**
   * Get element count
   * @param {string} selector - Element selector
   * @returns {Promise<number>} Element count
   */
  async getCount(selector) {
    return await this.page.locator(selector).count();
  }

  /**
   * Get attribute value
   * @param {string} selector - Element selector
   * @param {string} attribute - Attribute name
   * @returns {Promise<string>} Attribute value
   */
  async getAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Press keyboard key
   * @param {string} key - Key to press
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }
}

module.exports = BasePage;