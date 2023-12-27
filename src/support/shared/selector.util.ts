import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';
import { $, $$ } from '@wdio/globals';

let driver: WebdriverIO.Browser;

//https://webdriver.io/docs/selectors/#mobileselectors

function getAllByTestId(testId: string,): ChainablePromiseArray<WebdriverIO.ElementArray> {
    return $$(getByTestIdSelector(testId));
}

function getByTestIdStartsWith(testId: string): ChainablePromiseElement<WebdriverIO.Element> {
    let selector: string;
    if (driver.isAndroid) {
        selector = `android = new UiSelector().resourceIdMatches("^${testId}.*")`;
    } else {
        selector = `-ios predicate string:name BEGINSWITH("${testId}")`;
    }
    return $(selector);
}

function getAllByTestIdStartsWith(testId: string,): ChainablePromiseArray<WebdriverIO.ElementArray> {
    let selector: string;
    if (driver.isAndroid) {
        selector = `android = new UiSelector().resourceIdMatches("^${testId}.*")`;
    } else {
        selector = `-ios predicate string:name BEGINSWITH("${testId}")`;
    }
    return $$(selector);
}

function getAllElementByTestId(testId: string,): ChainablePromiseArray<WebdriverIO.ElementArray> {
    let selector: string;
    if (driver.isAndroid) {
        selector = `android = new UiSelector().resourceIdMatches("^${testId}.*")`;
    } else {
        selector = `-ios predicate string:name=="${testId}"`;
    }
    return $$(selector);
}

function getByParentElement(parentSelector: string, childSelector: string): ChainablePromiseArray<WebdriverIO.ElementArray> {
    let selector: string;
    if (driver.isAndroid) {
        selector = `android = ${getByParentChild(parentSelector, childSelector)}`;
    } else {
        selector = `-ios ${getByParentChild(parentSelector, childSelector)}`;
    }
    return $$(selector);
}

function getByParentChild(parentSelector: string, childSelector: string) {
    if (driver.isAndroid) {
        return `new UiSelector().resourceId("${parentSelector}").childSelector(UiSelector().resourceId("${childSelector}"))`;
    }
    return `class chain:**/*[\`name == "${parentSelector}"\`]/**/*[\`name == "${childSelector}"\`]`;
}

function getByTestId(testId: string): ChainablePromiseElement<WebdriverIO.Element> {
    return $(getByTestIdSelector(testId));
}

function getByTestIdMatches(testIdPattern: string): ChainablePromiseElement<WebdriverIO.Element> {
    return $(getByTestIdMatchesSelector(testIdPattern));
}

function getByTestIdMatchesSelector(testIdPattern: string): string {
    if (driver.isAndroid) {
        return `android = new UiSelector().resourceIdMAtches("${testIdPattern}")`;
    }
    return `-ios predicate string: name MATCHES("${testIdPattern}")`;
}

function getAndroidScrollableComponent() {
    return `new UiScrollable(new UiSelector().className("android.widget.ScrollView"))`;
}


function getByTestIdAfterScroll(testId: string) {
    if (driver.isAndroid) {
        return $(
            `android = ${getAndroidScrollableComponent()}.scrollIntoView(new UiSelector().resourceId("${testId}"))`
        );
    }
    return $(getByTestIdSelector(testId));
}

function getByParentAfterScroll(parentSelector: string, childSelector: string): ChainablePromiseElement<WebdriverIO.Element> {
    if (driver.isAndroid) {
        return $(
            `android = ${getAndroidScrollableComponent()}.scrollIntoview(${getByParentChild(parentSelector, childSelector)})`
        );
    }
    return $(`-ios ${getByParentChild(parentSelector, childSelector)}`);
}

function getByTestIdSelector(testId: string): string {
    if (driver.isAndroid) {
        return `android = new UiSelector().resourceId("${testId}")`;
    }
    return `-ios predicate string: name=="${testId}"`;
}

function getByAccessibilityId(accessibilityId: string): ChainablePromiseElement<WebdriverIO.Element> {
    let selector: string;
    if (driver.isAndroid) {
        selector = `android = new UiSelector().description("${accessibilityId}")`;
    }
    else {
        selector = `~${accessibilityId}`;
    }
    return $(selector);
}

function getButtonByTestId(testId: string): ChainablePromiseElement<WebdriverIO.Element> {
    if (driver.isAndroid) {
        return getByTestId(testId).$(`android = new UiSelector().resourceIdMatches("text-${testId}")`);
    }
    if (driver.isIOS) {
        return getByTestId(testId);
    }
    return getByTestId(testId);
}

function getInputBoxByTestID(testId: string): ChainablePromiseElement<WebdriverIO.Element> {
    if (driver.isAndroid) {
        return getByTestId(testId).$(
            `android = new UiSelector().className("android.widget.EditText")`
        )
    }
    return getByTestId(testId).$('-ios predicate string: type == "XCUITElementTypeTextField"')
}

class PlatformError extends Error {
    public constructor(functionName: string) {
        super(
            `[${functionName}]: Detected a non-Android or non-iOS platform.This function only supports Android and iOS`
        )
    }
}

function getByTestIdWithXPathSelector(testId: string) {
    if (driver.isAndroid) {
        return `//*[@resource-id="${testId}"]`;
    }
    if (driver.isIOS) {
        return `//*[@name="${testId}"]`;
    }
    throw new PlatformError('getByTestIdWithXPathSelector');
}

function getByTestIdWithXPath(testId: string) {
    return $(getByTestIdWithXPathSelector(testId));
}

function getByTestIdStartsWithXpathSelector(testIdStartsWith: string) {
    if (driver.isAndroid) {
        return `//*[starts-with(@resource-id, "${testIdStartsWith}")]`;
    }
    if (driver.isIOS) {
        return `//*[starts-with(@name, "${testIdStartsWith}")]`;
    }
    throw new PlatformError('getByTestIdWithXPathSelector');
}

function getByTestIdStartsWithXpath(testId: string) {
    return $(getByTestIdStartsWithXpathSelector(testId));
}

//only android helpers

const getUiSelectorLocatorAndroid = (selector: string) =>
    `android = new UiSelector().${selector}`;

//https://webdriver.io/docs/selectors/#class-name

function getByClassName(className: string): ChainablePromiseElement<WebdriverIO.Element> {
    return $(`${className}`);
}

function getByUiSelectorAndroid(selector: string): ChainablePromiseArray<WebdriverIO.ElementArray> {
    if (driver.isAndroid) {
        return $$(`${getUiSelectorLocatorAndroid(selector)}`);
    }
}

function getAllByUiSelectorAndroid(selector: string): ChainablePromiseArray<WebdriverIO.ElementArray> {
    if (driver.isAndroid) {
        return $$(getUiSelectorLocatorAndroid(selector));
    }
}

function getByUiTextSelectorAndroid(label: string): ChainablePromiseElement<WebdriverIO.Element> {
    if (driver.isAndroid) {
        return $(`android = new UiSelector().text("${label}")`);
    }
}

function getByPredicateStringIOS(selector: string): ChainablePromiseElement<WebdriverIO.Element> {
    return $(`-ios predicate string: ${selector}`);
}
function getByClassChainIOS(selector: string): ChainablePromiseElement<WebdriverIO.Element> {
    return $(`-ios class chain: ${selector}`);
}

export const selectorUtil = {
    getByTestIdSelector,
    getAllByTestId
}




