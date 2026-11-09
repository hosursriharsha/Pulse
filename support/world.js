const { World, setWorldConstructor } =
    require('@cucumber/cucumber');

const { getConfig } = require('../utils/configReader');

class CustomWorld extends World {
    constructor(options) {
        super(options);

        this.config = getConfig();

        this.browser = null;
        this.context = null;
        this.page = null;
    }
}

setWorldConstructor(CustomWorld);