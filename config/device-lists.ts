export const IOS = 'iOS';
export const ANDROID = 'Android';
export interface SupportedDeviceList {
    device: string;
    os?: string;
    platform: string;
}

export const automationNames = [
    {
        platform: IOS,
        automationFramework: 'XCUITest'
    },
    {
        platform: ANDROID,
        automationFramework: 'UiAutomator2'
    }
];

export const supportedDevices: SupportedDeviceList[] = [
    {
        device: 'iPhone 14 Pro Max',
        os: '16',
        platform: IOS
    },
    {
        device: 'iPhone 13',
        os: '15',
        platform: IOS
    },
    {
        device: 'Samsung Galaxy S23 Ultra',
        os: '13',
        platform: ANDROID
    },
    {
        device: 'Google Pixel 7 Pro',
        os: '13.0',
        platform: ANDROID
    },

]