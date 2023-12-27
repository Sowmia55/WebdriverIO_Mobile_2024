import { injectable } from "inversify";
import { ChainablePromiseElement } from 'webdriverio';
import { LoginScreen } from "./login.screen";

@injectable()
export class LoginScreenIOS extends LoginScreen {
    getUsernameInputBox(): ChainablePromiseElement<WebdriverIO.Element> {
        return $("");
    }
    getWaitElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return $("");
    }
}