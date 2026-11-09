const fs = require('fs');
const path = require('path');

function getConfig() {
    const env = (process.env.TEST_ENV || 'QA').toUpperCase();

    const configPath = path.join(
        process.cwd(),
        'config',
        'environment',
        `${env}.json`
    );

    if (!fs.existsSync(configPath)) {
        throw new Error(`Environment configuration not found: ${env}`);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    return config;
}

module.exports = { getConfig };