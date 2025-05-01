# Playwright Page Object Model Framework

This is a sample Playwright test framework using the Page Object Model (POM) design pattern.

## Project Structure

```
playwright-pom-framework/
├── pages/             # Page object models
│   └── todo-page.ts   # Todo application page object
├── tests/             # Test files
│   └── todo.spec.ts   # Todo app tests
├── playwright.config.ts  # Playwright configuration
└── package.json      # Project dependencies
```

## Setup

1. Install dependencies:
```
npm install
```

2. Install Playwright browsers:
```
npx playwright install
```

## Running Tests

Run all tests:
```
npm test
```

Run with specific browser:
```
npx playwright test --project=chromium
```

Run a specific test file:
```
npx playwright test tests/todo.spec.ts
```

## View Test Report

After tests run, view the HTML report:
```
npx playwright show-report
```

## Test Example

The sample tests demonstrate automating a Todo application with Playwright, including:
- Adding todo items
- Marking todos as completed
- Removing todo items
- Clearing completed todos