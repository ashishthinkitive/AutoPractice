const BasePage = require('./BasePage');

/**
 * Library Page - handles library module functionality
 */
class LibraryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      libraryModule: 'a[href*="/library"]',
      loincCodeTab: 'button:has-text("LOINC Code Catalog")',
      addLoincCodeButton: 'button:has-text("Add LOINC Code")',
      codeInput: 'input[placeholder="Enter LOINC Code"]',
      descriptionInput: 'textarea[placeholder="Enter Description"]',
      saveButton: 'button:has-text("Save")',
      loincCodeTable: 'table.loinc-codes-table',
      lastRowCode: 'table.loinc-codes-table tr:last-child td:nth-child(1)',
      lastRowDescription: 'table.loinc-codes-table tr:last-child td:nth-child(2)',
      searchInput: 'input[placeholder="Search LOINC Codes"]',
    };
  }

  /**
   * Navigate to library module
   */
  async navigateToLibraryModule() {
    await this.click(this.selectors.libraryModule);
    await this.waitForPageLoad();
  }

  /**
   * Click on LOINC Code Catalog tab
   */
  async clickLoincCodeTab() {
    await this.click(this.selectors.loincCodeTab);
    await this.waitForElement(this.selectors.loincCodeTable);
  }

  /**
   * Click on Add LOINC Code button
   */
  async clickAddLoincCode() {
    await this.click(this.selectors.addLoincCodeButton);
    await this.waitForElement(this.selectors.codeInput);
  }

  /**
   * Add a new LOINC code
   * @param {string} code - LOINC code
   * @param {string} description - Description
   */
  async addLoincCode(code, description) {
    await this.fill(this.selectors.codeInput, code);
    await this.fill(this.selectors.descriptionInput, description);
    await this.click(this.selectors.saveButton);
    
    // Wait for table to update
    await this.waitForPageLoad();
    await this.page.waitForTimeout(1000); // Additional wait for table refresh
  }

  /**
   * Get the last added LOINC code information
   * @returns {Promise<Object>} Code and description
   */
  async getLastAddedLoincCode() {
    const code = await this.getText(this.selectors.lastRowCode);
    const description = await this.getText(this.selectors.lastRowDescription);
    return { code, description };
  }

  /**
   * Search for a LOINC code
   * @param {string} searchTerm - Search term
   */
  async searchLoincCode(searchTerm) {
    await this.fill(this.selectors.searchInput, searchTerm);
    await this.pressKey('Enter');
    
    // Wait for table to update
    await this.page.waitForTimeout(1000);
  }
}

module.exports = LibraryPage;