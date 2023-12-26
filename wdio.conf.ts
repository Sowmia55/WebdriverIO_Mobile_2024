import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './test/tsconfig.json',
            transpileOnly: true
        }
    },

    port: 4723,
    specs: [
        './integration/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': '',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': ""
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
