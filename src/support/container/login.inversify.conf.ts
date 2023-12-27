import { Container } from "inversify";
import { LoginScreenIOS } from "../modules/login/login.screen.ios";
import { LoginScreenAndroid } from "../modules/login/login.screen.android";
import { LOGIN } from "./login.symbol";
import { LoginScreen } from "../modules/login/login.screen";

export const logincontainer = new Container();
logincontainer.bind<LoginScreen>(LOGIN.LoginScreen)
    .to(driver.isIOS ? LoginScreenIOS : LoginScreenAndroid)