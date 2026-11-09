const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');

const SamplePage = require('../pages/SamplePage');

Given('I open the application', async function () {

    this.samplePage = new SamplePage(this.page);

    await this.samplePage.openApplication(
        this.config.baseUrl
    );
});

When('I enter valid credentials', async function () {

    await this.samplePage.login(
        this.config.username,
        this.config.password
    );
});

Then('I should see the application title', async function () {

    const title = await this.samplePage.getTitle();

    console.log('Application title:', title);
});