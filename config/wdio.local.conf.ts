import 'dotenv/config';
import { baseCapabilities, baseConfig } from './constants';
import { IOS, automationNames } from './device-lists';

const appiumPlatformName = process.env.APPIUM_PLATFORM_NAME || IOS;
const appiumDeviceName = process.env.APPIUM_DEVICE_NAME;
const appiumPlatformVersion = process.env.APPIUM_PLATFORM_VERSION;
const appiumApp = process.env.APPIUM_APP;
const appiumAutomationName = automationNames.find(
    (platformMapping) =>
        platformMapping.platform.toUpperCase() === appiumPlatformName.toUpperCase(),
)?.automationFramework || 'XCUITest';


const config = baseConfig;
const iosCapabilities = {
    ...baseCapabilities,
    platform: appiumPlatformName,
    'appium:deviceName': appiumDeviceName,
    'appim:automationName': appiumAutomationName,
    'appium:platformVersion': appiumPlatformVersion,
    'appium:app': appiumApp,
    'appium:settings[snapshotMaxDepth]': 62,
    'appium:safariInitialUrl': '',
    'appium:maxTypingFrequency': 10,
    'appium:useNewDA': false,
}

const androidCapabilities = {
    ...baseCapabilities,
    platform: appiumPlatformName,
    'appium:deviceName': appiumDeviceName,
    'appim:automationName': appiumAutomationName,
    'appium:platformVersion': appiumPlatformVersion,
    'appium:app': appiumApp,
}

config.capabilities = [
    process.env.APPIUM_PLATFORM_NAME?.toLowerCase() === 'android'
        ? androidCapabilities
        : iosCapabilities
]

exports.config = config;
