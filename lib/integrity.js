import password from "./password";

export default function integrity(password) {
    var checks = []
    checks.push(characterLength(password))
    checks.push(characterHasSymbols(password))
    checks.push(hasLowerCase(password))
    checks.push(hasUpperCase(password))
    checks.push(hasNumbers(password))
    return checks
}

const characterLength = password => {
    let isLongEnough = password.length >= 8;

    return testObject(`Password length is at least 8 characters ${check(isLongEnough)}`)
}

const characterHasSymbols = password => {
    let symbols = (`'!\"#$%&\'()*+,-./:;<=>?[\\]^_}|{~'` + '`')
    let hasEnoughSymbols = password.split('').filter(v => (symbols.includes(v))).length >= 1;

    return testObject(`Password has at least one symbol ${check(hasEnoughSymbols)}`)
}

const hasLowerCase = password => {
    let hasLowerCase = password.split('').filter(v => (/^[a-z]*$/.test(v))).length >= 1;

    return testObject(`Password has at least one lowercase ${check(hasLowerCase)}`)
}

const hasUpperCase = password => {
    let hasUpperCase = password.split('').filter(v => (/^[A-Z]*$/.test(v))).length >= 1;

    return testObject(`Password has at least one uppercase ${check(hasUpperCase)}`)
}

const hasNumbers = password => {
    let hasNumbers = password.split('').filter(v => (!isNaN(v) && v != ' ')).length >= 1;

    return testObject(`Password has at least one number ${check(hasNumbers)}`)
}

const check = val => val ? '✅' : '❌'
const testObject = test => ({test})