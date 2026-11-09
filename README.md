# Pulse – Playwright + Cucumber Automation Framework

Pulse is a JavaScript-based UI automation framework built with **Playwright**, **Cucumber.js**, and **Allure**. It demonstrates BDD-style test authoring, a Page Object Model (POM), scenario-level browser management, environment configuration, parallel execution, retry, and reporting.

> **Project status:** Initial framework implementation. The current sample scenario opens Google and prints the page title. Extend the sample with assertions and application-specific locators before using it for real application testing.

## Tech stack

- Node.js
- Playwright
- Cucumber.js
- Allure Cucumber.js reporter
- Allure Commandline
- cross-env

## Prerequisites

- Node.js version supported by the installed Cucumber version (the current dependency requires Node.js 22 or 24, or 26+).
- npm
- Git

## Installation

Clone the repository and move into the project directory:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Pulse
```

Install project dependencies:

```bash
npm ci
```

Install the Playwright browser used by the current QA configuration:

```bash
npx playwright install chromium
```

If you later configure Firefox or WebKit, install those browsers too:

```bash
npx playwright install firefox
npx playwright install webkit
```

## Project structure

```text
Pulse/
├── config/
│   └── environment/
│       └── QA.json
├── features/
│   └── Sample.feature
├── pages/
│   ├── BasePage.js
│   └── SamplePage.js
├── steps/
│   └── sample.js
├── support/
│   ├── hooks.js
│   └── world.js
├── utils/
│   └── configReader.js
├── cucumber.js
├── package.json
└── package-lock.json
```

### Main components

| Component | Responsibility |
|---|---|
| `features/` | Gherkin feature files and scenarios |
| `steps/` | Cucumber step definitions |
| `pages/` | Page Object classes and reusable page operations |
| `support/world.js` | Scenario-scoped World containing config, browser, context and page |
| `support/hooks.js` | Launches and closes the browser around each scenario; attaches a screenshot for passed scenarios |
| `utils/configReader.js` | Loads the environment JSON selected by `TEST_ENV` |
| `config/environment/` | Environment-specific configuration |
| `cucumber.js` | Cucumber paths, support files, formatters, parallel workers and retry settings |

## Environment configuration

The environment is selected using the `TEST_ENV` environment variable. The current project includes `config/environment/QA.json`.

Example:

```json
{
  "baseUrl": "https://www.google.com",
  "browser": "chromium",
  "headless": false
}
```

The `browser` property is used by the Hooks to select `chromium`, `firefox`, or `webkit`. The corresponding Playwright browser must be installed.

### Add another environment

Create another JSON file in `config/environment/`, for example `SIT.json`:

```json
{
  "baseUrl": "https://sit.example.com",
  "browser": "chromium",
  "headless": false
}
```

Add an npm script in `package.json`:

```json
"test:sit": "cross-env TEST_ENV=SIT cucumber-js"
```

Then run:

```bash
npm run test:sit
```

The current `package.json` defines `test:qa`:

```bash
npm run test:qa
```

If `TEST_ENV` is not set, `configReader.js` defaults to `QA`.

**Credentials:** Do not commit real usernames, passwords, tokens, or other secrets in environment JSON files. Use environment variables or a secrets manager for credentials. If you add local secret files, exclude them in `.gitignore`.

## Running tests

Run the current QA suite:

```bash
npm run test:qa
```

This command sets `TEST_ENV=QA` using `cross-env` and starts Cucumber.

You can also run Cucumber directly:

```bash
npx cucumber-js
```

## Parallel execution and retry

The current `cucumber.js` configuration contains:

```javascript
parallel: 2,
retry: 1
```

- `parallel: 2` allows Cucumber to execute up to two scenarios concurrently.
- `retry: 1` allows a failed scenario one retry.

To observe parallel execution, add at least two independent scenarios. Each scenario receives its own World and, through the current Hooks, its own browser, context and page.

## Browser selection

The Hooks support these Playwright browser types:

- `chromium`
- `firefox`
- `webkit`

Set the desired browser in the selected environment JSON:

```json
{
  "baseUrl": "https://www.google.com",
  "browser": "chromium",
  "headless": false
}
```

Install the corresponding browser before running tests. The repository's current setup installs Chromium.

## Allure reporting

The Cucumber configuration uses `allure-cucumberjs/reporter` and writes raw results to `allure-results/`.

### 1. Execute tests

```bash
npm run test:qa
```

### 2. Generate the HTML report

```bash
npx allure generate allure-results --clean -o allure-report
```

### 3. Open the report

```bash
npx allure open allure-report
```

The report includes scenario results and attachments captured by the Allure reporter. The current `After` hook attaches a full-page screenshot when a scenario passes.

To view an existing generated report without regenerating it:

```bash
npx allure open allure-report
```

Always execute the tests and regenerate the report when you want to view the latest results.

## Adding a new Page Object

1. Create a page class under `pages/`.
2. Extend `BasePage` when the page needs the shared browser operations.
3. Define that page's locators in its constructor.
4. Add page-specific actions as methods.
5. Instantiate the page object from a Cucumber step using `this.page`.

Keep selectors close to the page behaviour they support. Avoid putting every application's locators into one large global file.

