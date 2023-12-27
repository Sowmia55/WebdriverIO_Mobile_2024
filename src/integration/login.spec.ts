import { LoginScreen } from '../support/modules/login/login.screen';
import { LOGIN } from "../support/container/login.symbol";
import { container } from "../support/container/inversify.config";

describe('Login', async () => {
    let loginScreen: LoginScreen;

    before(async () => {
        loginScreen = container.get(LOGIN.LoginScreen)
    })

    it("check", async () => {
        driver.pause(10000);

    })
})