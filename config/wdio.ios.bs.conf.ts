import { config } from './wdio.shared.conf';


config.user = 'sowmiab_q5oIf4';
config.key = 'Uvj6RSGzkcnFvQ4WQjMo';

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