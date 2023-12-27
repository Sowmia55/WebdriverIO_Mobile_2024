import _ from "lodash";

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(n: number) {
    let randomstring = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i += 1) {
        randomstring += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return randomstring;
}

export function generatePasswordRandomString(n: number) {
    let randomstring = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    for (let i = 0; i < n; i += 1) {
        randomstring += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return randomstring;
}

export function removeSpecial(givenString: string) {
    return givenString.replace(/[^0-9a-zA-Z. ]/g, '');
}

export function generateRandomPhoneNumber() {
    return _.random(860989000, 8609894442);
}