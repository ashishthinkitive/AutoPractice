/**
 * Custom reporter for test results
 */
class Reporter {
  constructor() {
    this.testResults = [];
  }

  /**
   * Record a test result
   * @param {Object} testInfo - Test information
   * @param {string} status - Test status (passed, failed, skipped)
   * @param {number} duration - Test duration in milliseconds
   * @param {string} error - Error message if test failed
   */
  recordTestResult(testInfo, status, duration, error = null) {
    this.testResults.push({
      title: testInfo.title,
      file: testInfo.file,
      status,
      duration,
      error,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Generate test reports
   */
  generateReports() {
    this._generateConsoleReport();
    // Additional report types could be added here (JSON, HTML, etc.)
  }

  /**
   * Generate a console report
   * @private
   */
  _generateConsoleReport() {
    console.log('\n==============================');
    console.log('Test Results Summary');
    console.log('==============================');

    const passed = this.testResults.filter(result => result.status === 'passed').length;
    const failed = this.testResults.filter(result => result.status === 'failed').length;
    const skipped = this.testResults.filter(result => result.status === 'skipped').length;
    const total = this.testResults.length;

    console.log(`Total: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Skipped: ${skipped}`);
    console.log('------------------------------');

    // Log failed tests
    if (failed > 0) {
      console.log('\nFailed Tests:');
      this.testResults
        .filter(result => result.status === 'failed')
        .forEach(result => {
          console.log(`\n${result.title} (${result.file})`);
          console.log(`Error: ${result.error}`);
        });
    }

    console.log('\n==============================\n');
  }
}

module.exports = new Reporter();