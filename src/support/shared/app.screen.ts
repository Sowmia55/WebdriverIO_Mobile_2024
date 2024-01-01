import { injectable } from 'inversify';
import { ChainablePromiseElement, ChainablePromiseArray } from 'webdriverio';
import { RectReturn, SWIPE_DIRECTION, XY } from './swipe.const';
import { ElementType } from './types-interface';

// import logger from '@wdio/logger';

@injectable()
export abstract class AppScreen {
    // protected log = logger('webdriver');
    /*
    return wait element, to determine if the screen is fully loadded or not
    */
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
    async waitForAtleastButtonToBeOnScreen(): Promise<void> {
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
                    // this.log.info(`Element displayed: ${isDisplayedAfter}`);
                    console.log(`Element displayed: ${isDisplayedAfter}`);
                })
                .catch((reason) => {
                    console.log(`Element not displayed, because: ${reason}`)
                })
        }
    }
    async waitForWaitElement(isShown = true) {
        const className = this.getClassName();
        return (await this.getWaitElement())
            .waitForDisplayed({ reverse: !isShown })
            .then((isDisplayedAfter) => {
                console.log(`Element displayed: ${isDisplayedAfter}`);
                return isDisplayedAfter;
            })
            .catch((reason) => {
                console.log(`Element not displayed, on ${className} because: ${reason}`)
                return false;
            })

    }
    async waitforScreentoLoad(isShown = true): Promise<boolean | void> {
        await this.waitForAtleastButtonToBeOnScreen();
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
    // Return iOS Predicate Selector - ('-ios predicate string:name=="txt_sptlight"')
    getElementIOS(elementType: WebdriverIO.ElementType): string {
        return `-ios predicate string:${this.predicateStringBuilder(elementType)}`;
    }
    predicateStringBuilder(elementType: WebdriverIO.ElementType): string {
        return `${elementType.automationId
            ? this.getNameSelector(elementType)
            : this.getLabelSelector(elementType)}`
    }
    getNameSelector(elementType: WebdriverIO.ElementType): string {
        return `name=="${elementType.automationId}"`;
    }
    getLabelSelector(elementType: WebdriverIO.ElementType): string {
        return `name=="${elementType.text}"`;
    }
    //Retruns Android UiSelector - 'android = new UiSelector().resourceId("com.foc")'
    getElementAndroid(elementType: WebdriverIO.ElementType): string {
        return `android = new UiSelector().${elementType.automationId
            ? this.getResourceIdSelector(elementType)
            : this.getTextSelector(elementType)
            }`
    }
    getResourceIdSelector(elementType: WebdriverIO.ElementType): string {
        return `resourceId("${elementType.automationId}")`;
    }
    getTextSelector(elementType: WebdriverIO.ElementType): string {
        return `text("${elementType.text}")`;
    }
    getButtonIOS(elementType: WebdriverIO.ElementType) {
        return $(`${this.getElementIOS(elementType)} and type == "XCUIElementTypeButton"`,
        );
    }
    getButtonAndroid(elementType: WebdriverIO.ElementType) {
        return $(`${this.getElementAndroid(elementType,)}.className("android.widget.Button").clickable(true)`)
    }
    getInputBoxIOS(elementType: WebdriverIO.ElementType): ChainablePromiseElement<WebdriverIO.Element> {
        return $(`${this.getElementIOS(elementType)} and (type =="XCUIElementTypeTextFiedl" or type == "XCUIElementTypeSecureTextField")`);
    }
    getInputBoxAndroid(elementType: WebdriverIO.ElementType): ChainablePromiseElement<WebdriverIO.Element> {
        return $(`${this.getElementAndroid(elementType)}.className("android.widget.EditText")`)
    }
    getLabelAndroid(elementType: WebdriverIO.ElementType): ChainablePromiseElement<WebdriverIO.Element> {
        return $(`${this.getElementAndroid(elementType)}.className("android.widget.TextView")`)
    }
    getByAccessibilityId(id: string): ChainablePromiseElement<WebdriverIO.Element> {
        return driver.isIOS
            ? $(this.getElementIOS({ automationId: id }))
            : $(this.getElementAndroid({ automationId: id }))
    }
    getByText(id: string): ChainablePromiseElement<WebdriverIO.Element> {
        return driver.isIOS
            ? $(this.getElementIOS({ text: id }))
            : $(this.getElementAndroid({ text: id }))
    }
    getByClassName(className: string,
        instance: number): ChainablePromiseElement<WebdriverIO.Element> {
        return driver.isIOS
            ? $(this.getByClassNameIOS(className, instance))
            : $(this.getByClassNameAndroid(className, instance))
    }
    getByClassNameIOS(className: string, instance: number): ChainablePromiseElement<WebdriverIO.Element> {
        return $(`-ios class chain: **/${className}[${instance}]`);
    }
    getByClassNameAndroid(className: string, instance: number) {
        return $(`android = new UiSelector().className(${className}).instance(${instance})`)
    }
    getByAutomationIdArray(id: string): ChainablePromiseArray<WebdriverIO.ElementArray> {
        return driver.isIOS
            ? $$(this.getElementIOS({ automationId: id }))
            : $$(this.getElementAndroid({ automationId: id }));
    }
    //SWIPE
    async checkIfDisplayedWithSwipeUpIOS(
        element: ChainablePromiseElement<WebdriverIO.Element>,
        maxScrolls: number,
        swipePercent: number,
        amount = 0,
    ) {
        if (!(await element.isDisplayed()) && amount <= maxScrolls) {
            await this.swipeUp(swipePercent / 100);
            await this.checkIfDisplayedWithSwipeUpIOS(element, maxScrolls, swipePercent, amount + 1);
        }
        else if (amount > maxScrolls) {
            // this.log.error(`The element count not be found`);
            console.log(`The element count not be found`);
        }
    }
    async swipeOnElementIOS(elementId: string, directionToSwipe: string) {
        await driver.execute('mobile: swipe', {
            elementId,
            direction: directionToSwipe
        })
    }
    async swipeDown(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.down.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.down.end, percentage)
        )
    }
    async swipeUp(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.up.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.up.end, percentage),
        )
    }
    async swipeLeft(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.left.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.left.end, percentage),
        )
    }
    async swipeRight(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.right.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.right.end, percentage),
        )
    }
    async swipeOnPercentage(from: XY, to: XY) {
        const screenSize: RectReturn = await driver.getWindowRect();
        const pressOptions = this.getDeviceScreenCoordinates(screenSize, from);
        const moveToScreenCoordinates = this.getDeviceScreenCoordinates(screenSize, to);
        await this.swipe(pressOptions, moveToScreenCoordinates);
    }
    async swipe(from: XY, to: XY) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
                    { type: 'pointerUp', button: 0 },
                ]
            }
        ]);
        await driver.pause(1000);
    }
    private getDeviceScreenCoordinates(screenSize: RectReturn, coordinates: XY): XY {
        return {
            x: Math.round(screenSize.width * (coordinates.x / 100)),
            y: Math.round(screenSize.height * (coordinates.y / 100))
        }
    }
    private calculateXY({ x, y }: XY, percentage: number): XY {
        return {
            x: x * percentage,
            y: y * percentage,
        }
    }
}




