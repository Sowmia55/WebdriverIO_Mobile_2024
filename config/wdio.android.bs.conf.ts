import { config } from './wdio.shared.conf';
import 'dotenv/config';

config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_PASSWORD;
config.specs = [
    './integration/login.spec.ts'
];
config.capabilities = [
    {
        platformName: "Android",
        "appium:platformVersion": "10.0",
        "appium:deviceName": "Google Pixel 3",
        "appium:automationName": "UIAutomator2",
        "appium:app": "bs://490584f17e0546e03da4798ab525a89dbe6577d0",
        "appium:autoGrantPermissions": true
    }
]
config.services = ['browserstack'];

exports.config = config;