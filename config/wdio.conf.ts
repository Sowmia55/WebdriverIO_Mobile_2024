import 'dotenv/config';
import { baseBstackOptions, baseCapabilities, baseConfig } from './constants';
import { IOS, supportedDevices } from './device-lists';
import sample from 'lodash/sample';

const config = baseConfig;

const appiumPlatformName = process.env.APPIUM_PLATFORM_NAME || IOS;
const randomDevice = sample(
    supportedDevices.filter((device) => {
        let isValid =
            device.platform.toUpperCase() === appiumPlatformName.toUpperCase();
        if (
            !process.env.APPIUM_DEVICE_NAME &&
            process.env.APPIUM_PLATFORM_VERSION
        ) {
            isValid = device.os === process.env.APPIUM_PLATFORM_VERSION;
        }
        return isValid;
    })
);
const appiumDeviceName = process.env.APPIUM_DEVICE_NAME || randomDevice?.device;
const appiumPlatformVersion = process.env.APPIUM_DEVICE_NAME
    ? process.env.APPIUM_PLATFORM_VERSION
    : randomDevice?.os;

const iosCapabilities = {
    ...baseCapabilities,
    'bstack:options': {
        ...baseBstackOptions,
        projectName: process.env.BROWSERSTACK_PROJECT_NAME || "Unamed IOS Project",
        buildName: process.env.BROWSERSTACK_BUILD_NAME || "Unamed IOS Build",
    },
    platformName: 'ios',
    'appium:automationName': 'XCUITest',
    'appium:app':
        process.env.APPIUM_APP || 'bs://a60bf534828f7332e8063376350c907a00f25c5d',
    'appium:deviceName': appiumDeviceName,
    'appium:platformVersion': appiumPlatformVersion,
    'appium:settings[snapshotMaxDepth]': 62,
    'appium:safariInitialUrl': '',
    'appium:maxTypingFrequency': 10,
};

const androidCapabilities = {
    ...baseCapabilities,
    'bstack:options': {
        ...baseBstackOptions,
        projectName: process.env.BROWSERSTACK_PROJECT_NAME || "Unamed Android Project",
        buildName: process.env.BROWSERSTACK_BUILD_NAME || "Unamed Android Build",
    },
    platformName: 'android',
    'appium:automationName': 'UiAutomator2',
    'appium:app':
        process.env.APPIUM_APP || 'bs://f7fbe4f4a34af59ef1aa2c5e3615dc99b1907cad',
    'appium:deviceName': appiumDeviceName,
    'appium:platformVersion': appiumPlatformVersion,
};

config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_PASSWORD;

config.capabilities = [
    process.env.APPIUM_PLATFORM_NAME?.toLowerCase() === 'android'
        ? androidCapabilities
        : iosCapabilities
];

exports.config = config;
