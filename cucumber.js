module.exports = {
    default: {
        paths: ['features/**/*.feature'],

        require: [
            'support/**/*.js',
            'pages/**/*.js',
            'steps/**/*.js'
        ],

        format: [
            'progress',
            'allure-cucumberjs/reporter'
        ],

        formatOptions: {
            resultsDir: 'allure-results'
        },

        parallel: 2,
        retry: 1
    }
};