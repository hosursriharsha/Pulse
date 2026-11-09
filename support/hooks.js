const {
    Before,
    After
} = require('@cucumber/cucumber');

const { chromium, firefox, webkit } =
    require('playwright');

Before(async function () {

    const browserTypes = {
        chromium,
        firefox,
        webkit
    };

    const browserType = browserTypes[this.config.browser];

    if (!browserType) {
        throw new Error(
            `Unsupported browser: ${this.config.browser}`
        );
    }

    this.browser = await browserType.launch({
        headless: this.config.headless
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    this.page.setDefaultTimeout(this.config.timeout);
});

After(async function ({ result, pickle }) {

    if (result.status === 'PASSED') {

        console.log(`Scenario: ${pickle.name} - PASSED`);

        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(screenshot, 'image/png');
    }

    if (this.page) {
        await this.page.close();
    }

    if (this.context) {
        await this.context.close();
    }

    if (this.browser) {
        await this.browser.close();
    }

});