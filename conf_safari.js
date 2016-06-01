// An example configuration file.
var HtmlReporter = require('protractor-jasmine2-html-reporter');
var path = require('path');
exports.config = {
     seleniumServerJar: 'e2e/helper/selenium-server-standalone-2.44.0.jar',
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort: null,
    // Chromedriver location is used to help the selenium standalone server
    // find chromedriver. This will be passed to the selenium jar as
    // the system property webdriver.chrome.driver. If null, selenium will
    // attempt to find chromedriver using PATH.
     chromeDriver: './node_modules/protractor/selenium/chromedriver_2.21.exe',
    directConnect: false,

    // Tests for browsers other than chrome will not run.
    chromeOnly: false,
    // Additional command line options to pass to selenium. For example,
    // if you need to change the browser timeout, use
    // seleniumArgs: ['-browserTimeout=60'],
    seleniumArgs: [],

    // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
    // The tests will be run remotely using SauceLabs.
    sauceUser: null,
    sauceKey: null,

    // The address of a running selenium server. If specified, Protractor will
    // connect to an already running instance of selenium. This usually looks like
    // seleniumAddress: 'http://localhost:4444/wd/hub'
    seleniumAddress: null,

    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.

    allScriptsTimeout: 27000,

    // ----- What tests to run -----
    // Spec patterns are relative to the current working directly when
    // protractor is called.
    //specs: ['e2e/speces/*.js'],

    // Patterns to exclude.
    exclude: [],

    // Alternatively, suites may be used. When run without a command line parameter,
    // all suites will run. If run with --suite=smoke, only the patterns matched
    // by that suite will run.
    suites: {
        //smoke: 'spec/smoketests/*.js',
        //full: 'spec/*.js'
    },

    // Maximum number of total browser sessions to run. Tests are queued in
    // sequence if number of browser sessions is limited by this parameter.
    // Use a number less than 1 to denote unlimited. Default is unlimited.
    maxSessions: 5,

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    // Additionally, you may specify count, shardTestFiles, and maxInstances.

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'safari',
        // Number of times to run this set of capabilities (in parallel, unless
        // limited by maxSessions). Default is 1.
        count: 1,

        // If this is set to be true, specs will be sharded by file (i.e. all
        // files to be run by this set of capabilities will run in parallel).
        // Default is false.
        shardTestFiles: false,

        // Maximum number of browser instances that can run in parallel for this
        // set of capabilities. This is only needed if shardTestFiles is true.
        // Default is 1.
        maxInstances: 1
    },

    // If you would like to run more than one instance of webdriver on the same
    // tests, use multiCapabilities, which takes an array of capabilities.
    // If this is specified, capabilities will be ignored.
    // Split will not work because the feature is not yet released. To use this we will have to pull Protractor from master.
    splitTestsBetweenCapabilities: false,
    multiCapabilities: [{
        'browserName': 'safari',
        'name': 'card2goweb',
		specs: ['e2e/speces/login-user-spec.js'],
        shardTestFiles: false,
        maxInstances: 1
    }/**,
     {
         'browserName': 'chrome',
         'name': 'Hotel Registration',
         shardTestFiles: true,
         maxInstances: 2
     }**/
    ],
    // ----- More information for your tests ----
    //
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9876',

    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement: 'body',

    // A callback function called once protractor is ready and available, and
    // before the specs are executed
    // You can specify a file containing code to run by setting onPrepare to
    // the filename string.


    onPrepare: function () {
        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
           allureReport: {
            resultsDir: 'allure-results'
              }
            }));
     
        browser.driver.manage().window().maximize();
        browser.driver.manage().timeouts().implicitlyWait(90000);
        browser.ignoreSynchronization = true;
        browser.getCapabilities().then(function (cap) {
		   browser.name = cap.get('browserName');
           browser.env = browser.params.env;
        });
        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };
    },

    // A callback function called once tests are finished.
    onComplete: function () {
        // At this point, tests will be done but global objects will still be
        // available.
    },

    // The params object will be passed directly to the protractor instance,
    // and can be accessed from your test. It is an arbitrary object and can
    // contain anything you may need in your test.
    // This can be changed via the command line as:
    //   --params.login.user 'Joe'
    params: {
     login: {
     user: 'Jane',
     password: '1234'
     }
     },

    framework: 'jasmine2',
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        // A function to call on completion.
        // function(passed)
        //onComplete: function (passed) {
        //    console.log('done!');
        //},
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 460000
    },

    // ----- Options to be passed to mocha -----
    //
    // See the full list at http://visionmedia.github.io/mocha/
    mochaOpts: {
        ui: 'bdd',
        reporter: 'list'
    },

    // ----- Options to be passed to cucumber -----
    cucumberOpts: {
        // Require files before executing the features.
        require: 'cucumber/stepDefinitions.js',
        // Only execute the features or scenarios with tags matching @dev.
        // This may be an array of strings to specify multiple tags to include.
        tags: '@dev',
        // How to format features (default: progress)
        format: 'summary'
    },

    // ----- The cleanup step -----
    //
    // A callback function called once the tests have finished running and
    // the webdriver instance has been shut down. It is passed the exit code
    // (0 if the tests passed or 1 if not). This is called once per capability.
    onCleanUp: function (exitCode) {
    }
};
