import 'dotenv/config';

export const baseConfig: WebdriverIO.Config = {
    specs: ['../integration/*.spec.ts'],
    capabilities: [],
    maxInstances: 10,
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 45000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    specFileRetries: Number(process.env.SPEC_FILE_RETRY ?? 0)
}

export const baseCapabilities = {
    maxInstances: 5,
    'appium:newCommandTimeout': 240,
    'appium:waitForIdleTimeout': 100,
    'appium:autoAcceptAlerts': false,
    'appium:autoDismissAlerts': false,
    'appium:fullContextList': true
}

export const baseBstackOptions = {
    deviceLogs: true,
    networkLogs: true,
    networkLogsOptions: {
        captureContent: true,
    },
    realMobile: true,
    acceptInsecureCerts: true,
    interactiveDebugging: true,
    resignApp: true
}