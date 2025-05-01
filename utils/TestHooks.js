const { test: base } = require('@playwright/test');
const reporter = require('./Reporter');

/**
 * Custom test fixture that extends Playwright's default test
 */
const test = base.extend({
  /**
   * Custom test fixture that integrates with our reporter
   * @param {*} fixture - Base test fixture
   * @param {Function} use - Use function
   */
  page: async ({ page }, use) => {
    // Store the start time
    const startTime = Date.now();
    
    // Setup error handling
    let testError = null;
    page.on('pageerror', error => {
      console.error(`Page error: ${error.message}`);
      // We don't fail the test here, just log the error
    });
    
    // Use the page in the test
    try {
      await use(page);
      
      // Test passed, record the result
      const testInfo = base.info();
      reporter.recordTestResult(
        testInfo,
        'passed',
        Date.now() - startTime
      );
    } catch (error) {
      // Test failed, record the result
      testError = error;
      const testInfo = base.info();
      reporter.recordTestResult(
        testInfo,
        'failed',
        Date.now() - startTime,
        error.message
      );
      throw error;
    }
  }
});

// Export hooks for afterAll, afterEach, etc.
module.exports = {
  test,
  
  /**
   * After all tests have run
   */
  afterAll: async () => {
    // Generate reports
    reporter.generateReports();
  }
};