import { ChainablePromiseElement } from 'webdriverio';
import { selectorUtil } from './selector.util';

// Android Scroll 

const getScrollableClassAndroid = (isVertical = true) =>
    isVertical
        ? 'android.widget.ScrollView'
        : 'andrord.widget.HorizontalScrollView';

function getScrollableElementAndroid(isVertical = true): string {
    const scrollableClass = isVertical
        ? 'android.widget.ScrollView'
        : 'android.widget.HorizontalScrollview';
    const horizontalFlag = isVertical ? "" : '.setAsHorizontkaList()';
    return `android = new UiScrollable(new UiSelector().className("${scrollableClass}"))${horizontalFlag}`;
}

function getScrollableElementByTestIdAndroid(testId: string, isVertical = true): ChainablePromiseElement<WebdriverIO.Element> {
    const scrollableClass = getScrollableClassAndroid(isVertical);
    return $(`android = new UiScrollable(new UiSelector().className("${scrollableClass}"))
.scrollIntoView(${selectorUtil.getByTestIdSelector(testId)
            .replace('android=', "")})`)
}

function scrollForwardAndroid() {
    return $(`${this.getScrollableElementAndroid()}.scrollForward()`);
}
function scrollBackwardAndroid() {
    return $(`${this.getScrollableElementAndroid()}.scrollBackward()`);
}
function flingToEndAndroid() {
    return $(`${this.getScrollableElementAndroid()}.flingToEnd(25)`);
}
function flingToBeginningAndroid() {
    return $(`${this.getScrollableElementAndroid()}.flingToBeginning(25)`);
}
function scrollToStartAndroid() {
    return $(`${this.getScrollableElementAndroid()}.scrollToBeginning(25)`);
}
function scrollToendAndroid() {
    return $(`${this.getScrollableElementAndroid()}.scrollToend(25)`);
}

//IOS Scroll

type Directions = "up" | 'down' | 'left' | 'right';

const getScrollableElement = async () =>
    (await $('-ios predicate string: type =="XCUIElementTypeScrollView"')).elementId;

const scrollToElementInIOS = async (testId: string, direction?: Directions) => {
    const element = await selectorUtil.getAllByTestId(testId);
    const directionToPerform = direction ?? 'down';

    if (element.length > 0) {
        await driver.execute('mobile:scrollToElement', { elementId: element[0].elementId })
    }
    else {
        await driver.execute('mobile:scroll', {
            element: await getScrollableElement(),
            name: testId,
            direction: directionToPerform,
        });
    }
}