# DemoQA Automation Framework

This repository contains a Selenium-based test automation framework for DemoQA website using Java, TestNG, and Extent Reports.

## Project Structure

- `src/test/java/base`: Contains base test configuration
- `src/test/java/pages`: Page Object Model classes
- `src/test/java/tests`: Test classes
- `src/test/java/utils`: Utility functions
- `src/test/resources/data`: Test data files

## Features

- Page Object Model design pattern
- TestNG for test execution
- Extent Reports for reporting
- Excel data-driven testing
- GitHub Actions integration

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- Firefox browser

### Running Tests

To run all tests:

```
mvn clean test
```

To run specific test suite:

```
mvn test -Dsurefire.suiteXmlFiles=testng.xml
```

Or for Excel data tests:

```
mvn test -Dsurefire.suiteXmlFiles=Excel.xml
```

### Reporting

Test reports are generated in the `reports` directory.

## GitHub Actions Workflows

This project includes two GitHub Actions workflows:

1. CI Pipeline (main.yml) - For full test execution with reporting
2. Regression Tests (regression.yml) - For running regression test suite

Both workflows can be triggered manually from the Actions tab.
