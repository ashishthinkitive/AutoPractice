const fs = require('fs');
const path = require('path');

/**
 * Properties Manager to read and parse properties files
 */
class PropertiesManager {
  /**
   * Read and parse a properties file
   * @param {string} filePath - Path to properties file
   * @returns {Object} Parsed properties
   */
  static readProperties(filePath) {
    try {
      const fullPath = path.resolve(filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Properties file not found at ${fullPath}`);
      }
      
      const content = fs.readFileSync(fullPath, 'utf8');
      return this.parseProperties(content);
    } catch (error) {
      console.error(`Error reading properties file: ${error.message}`);
      return {};
    }
  }
  
  /**
   * Parse properties content
   * @param {string} content - Properties content
   * @returns {Object} Parsed properties
   */
  static parseProperties(content) {
    const properties = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || line.trim() === '') {
        continue;
      }
      
      // Split by the first equals sign
      const separatorIndex = line.indexOf('=');
      if (separatorIndex !== -1) {
        const key = line.substring(0, separatorIndex).trim();
        const value = line.substring(separatorIndex + 1).trim();
        properties[key] = value;
      }
    }
    
    return properties;
  }
  
  /**
   * Get a property value
   * @param {Object} properties - Parsed properties
   * @param {string} key - Property key
   * @param {*} defaultValue - Default value if property doesn't exist
   * @returns {*} Property value
   */
  static getProperty(properties, key, defaultValue = null) {
    return key in properties ? properties[key] : defaultValue;
  }
  
  /**
   * Write properties to a file
   * @param {string} filePath - Path to properties file
   * @param {Object} properties - Properties to write
   */
  static writeProperties(filePath, properties) {
    try {
      const content = Object.entries(properties)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
      
      fs.writeFileSync(path.resolve(filePath), content, 'utf8');
    } catch (error) {
      console.error(`Error writing properties file: ${error.message}`);
    }
  }
}

module.exports = PropertiesManager;