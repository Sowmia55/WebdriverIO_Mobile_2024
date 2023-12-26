import { config } from './wdio.shared.conf';
import 'dotenv/config';

config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_PASSWORD;

config.specs = [
    '../integration/login.spec.ts'
];
config.capabilities = [
    {
        platformName: "iOS",
        "appium:deviceName": "iPhone 11",
        "appium:automationName": "XCUITest",
        "appium:app": "bs://444bd0308813ae0dc236f8cd461c02d3afa7901d",
        "appium:autoGrantPermissions": true
    }
]
config.services = ['browserstack'];

exports.config = config;