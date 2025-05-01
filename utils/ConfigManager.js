const PropertiesReader = require('properties-reader');
const path = require('path');

class ConfigManager {
  constructor() {
    this.properties = PropertiesReader(path.join(__dirname, '../config/config.properties'));
  }

  /**
   * Get a configuration property value
   * @param {string} key - Property key
   * @param {*} defaultValue - Default value if property doesn't exist
   * @returns {*} Property value
   */
  get(key, defaultValue = null) {
    return this.properties.get(key) || defaultValue;
  }

  /**
   * Get the base URL for the current environment
   * @returns {string} Base URL
   */
  getBaseUrl() {
    const environment = this.get('executionEnvironment', 'DEV').toLowerCase();
    return this.get(`${environment}Url`);
  }

  /**
   * Get the current browser
   * @returns {string} Browser name
   */
  getBrowser() {
    return this.get('browser', 'chromium');
  }

  /**
   * Get the headless mode setting
   * @returns {boolean} Headless mode
   */
  isHeadless() {
    return this.get('headless') === 'true';
  }

  /**
   * Get the default timeout
   * @returns {number} Timeout in milliseconds
   */
  getDefaultTimeout() {
    return parseInt(this.get('defaultTimeout', '30000'));
  }

  /**
   * Get the API base URL
   * @returns {string} API base URL
   */
  getApiBaseUrl() {
    return this.get('apiBaseUrl');
  }
}

module.exports = new ConfigManager();