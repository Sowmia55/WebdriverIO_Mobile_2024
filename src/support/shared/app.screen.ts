import { injectable } from 'inversify';
import { ChainablePromiseElement } from 'webdriverio';
// import logger from '@wdio/logger';

@injectable()
export abstract class AppScreen {
    // protected log = logger('webdriver');
    abstract getWaitElement(): ChainablePromiseElement<WebdriverIO.Element>;
    getSnapshotDepthIOS() {
        return 50;
    }
    getAppPackage() {
        return 'com.etc.etc';
    }
    getAppBundleId() {
        return 'com.etc.etc';
    }
    protected isWebView(): boolean {
        return false;
    }
    getByautomationIdWeb(automationId: string, postFix?: string): ChainablePromiseElement<WebdriverIO.Element> {
        return $(`[data-test-id = '${automationId}']${postFix || ""}`);
    }
    getButtonClass(): string {
        return driver.isIOS ? 'XCUIElemenytTypeButton' : 'android.widget.Button';
    }
    getClassName() {
        return this.constructor.name;
    }
    async waitForAtleaseButtonToBeOnScreen(): Promise<void> {
        const className = this.getClassName();
        if (!this.isWebView()) {
            await driver.waitUntil(
                async () =>
                    (await driver.getPageSource()).includes(this.getButtonClass()),
                {
                    timeout: 15000,
                    timeoutMsg: `no button found on page on ${className}`
                }

            )
                .then((isDisplayedAfter) => {
                    this.log.info(`Element displayed: ${isDisplayedAfter}`);
                })
                .catch((reason) => {
                    this.log.info(`Element not displayed, because: ${reason}`)
                })
        }
    }
    async waitForWaitElement(isShown = true) {
        const className = this.getClassName();
        return (await this.getWaitElement())
            .waitForDisplayed({ reverse: !isShown })
            .then((isDisplayedAfter) => {
                this.log.info(`Element displayed: ${isDisplayedAfter}`);
                return isDisplayedAfter;
            })
            .catch((reason) => {
                this.log.info(`Element not displayed, on ${className} because: ${reason}`)
                return false;
            })

    }
    async waitforScreentoLoad(isShown = true): Promise<boolean | void> {
        await this.waitForAtleaseButtonToBeOnScreen();
        return this.waitForWaitElement(isShown);
    }
    async validateText(element: ChainablePromiseElement<WebdriverIO.Element>, text: string) {
        if (driver.isIOS) {
            await expect(element).toHaveAttr('label', text);
        }
        else {
            await expect(element).toHaveText(text);
        }
    }
    async getAttributeWitContentDesc(): Promise<string> {
        return driver.isIOS ? 'label' : 'content-desc';
    }
    async tapElemetByPercentage(element: ChainablePromiseElement<WebdriverIO.Element>,
        xPercent: number,
        yPercent: number) {
        const elementReact = await driver.getElementRect(await element.elementId);
        const startPoint = elementReact.x + (elementReact.width * xPercent) / 100;
        const endPoint = elementReact.x + (elementReact.height * yPercent) / 100;
        driver.touchPerform([{
            action: 'press',
            options: {
                x: startPoint,
                y: endPoint
            },
        },
        {
            action: 'wait',
            options: {
                ms: 100,
            },
        },
        {
            action: "release",
            options: {},
        }
        ])
    }
    getAppIdentifer(): string {
        return driver.isIOS ? this.getAppBundleId() : this.getAppPackage();
    }
    async navigateBack(): Promise<void> {
        await driver.back();
    }
    async isKeyboardshown(): Promise<boolean> {
        return driver.isKeyboardShown();
    }
    async activateApp() {
        await driver.activateApp(`${this.getAppIdentifer()}`);
    }
    async terminateApp() {
        await driver.terminateApp(`${this.getAppIdentifer()}`);
    }
    async waitForLoadingIndicatorToDisappear() {
        if (driver.isIOS) {
            await this.waitForLoadingIndicatorToDisappearIOS();
        }
        else {
            await this.waitForLoadingIndicatorToDisappearAndroid();
        }
    }
    private async waitForLoadingIndicatorToDisappearIOS() {
        await driver.waitUntil(
            async () =>
                !(await (await $(`-ios predicate string: label: "LoadingIndicator"`))
                    .isDisplayed()),
            {
                timeoutMsg: 'Loading indicator displayed after 20s'
            }
        )
    }
    private async waitForLoadingIndicatorToDisappearAndroid() {
        await driver.waitUntil(
            async () =>
                !(await (await this.getByautomationIdWeb('Loading Indicator'))
                    .isDisplayed()),
            {
                timeoutMsg: 'Loading indicator displayed after 20s'
            }
        )
    }
}


