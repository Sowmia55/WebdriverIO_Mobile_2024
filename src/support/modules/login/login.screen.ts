import { injectable } from "inversify";
import { AppScreen } from "../../shared/app.screen";
import { ChainablePromiseElement } from 'webdriverio';

@injectable()
export abstract class LoginScreen extends AppScreen {
    getUsernameInputBox(): ChainablePromiseElement<WebdriverIO.Element> {
        return $("");
    }
}