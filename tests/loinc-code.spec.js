const { test, expect } = require('@playwright/test');
const AdminLoginPage = require('../pages/AdminLoginPage');
const LibraryPage = require('../pages/LibraryPage');
const ConfigManager = require('../utils/ConfigManager');

test.describe('LOINC Code Management', () => {
  let adminLoginPage;
  let libraryPage;
  
  // Generate a unique code for testing
  const testCode = `TEST-${Date.now().toString().slice(-6)}`;
  const testDescription = `Test Description for ${testCode}`;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    libraryPage = new LibraryPage(page);
    
    // Get credentials from config
    const username = ConfigManager.get('adminUsername');
    const password = ConfigManager.get('adminPassword');
    
    // Login
    await adminLoginPage.navigateToLoginPage();
    await adminLoginPage.login(username, password);
    
    // Wait for successful login
    await page.waitForTimeout(2000); // Wait for dashboard to load
  });

  test('should add a new LOINC code and verify it', async ({ page }) => {
    // Navigate to Library module
    await libraryPage.navigateToLibraryModule();
    
    // Click on LOINC Code Catalog tab
    await libraryPage.clickLoincCodeTab();
    
    // Click on Add LOINC Code button
    await libraryPage.clickAddLoincCode();
    
    // Add a new LOINC code
    await libraryPage.addLoincCode(testCode, testDescription);
    
    // Get the last added LOINC code information
    const { code, description } = await libraryPage.getLastAddedLoincCode();
    
    // Print the code and description
    console.log(`\nAdded LOINC Code: ${code}`);
    console.log(`Description: ${description}\n`);
    
    // Verify the code and description
    expect(code).toContain(testCode);
    expect(description).toBe(testDescription);
  });
});