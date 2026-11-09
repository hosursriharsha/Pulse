const BasePage = require('./BasePage');

class SamplePage extends BasePage {

    constructor(page) {
        super(page);

        // All page locators are maintained here
        this.locators = {
            username: page.locator('#username'),
            password: page.locator('#password'),
            loginButton: page.locator('#login'),
            errorMessage: page.locator('.error-message')
        };
    }

    async openApplication(url) {
        await this.navigate(url);
    }

    async login(username, password) {
        await this.enterText(this.locators.username, username);
        await this.enterText(this.locators.password, password);
        await this.click(this.locators.loginButton);
    }

    async getErrorMessage() {
        return await this.getText(this.locators.errorMessage);
    }
}

module.exports = SamplePage;