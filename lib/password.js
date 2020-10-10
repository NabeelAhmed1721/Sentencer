import psl from 'psl'

export default function password(data) {
    var { sentence, domain } = data
    domain = psl.parse(domain).sld
    var sentence = yodafy(sentence)
    sentence[0] = vcCounter(sentence[0])
    sentence = domainPadding(sentence, domain)
    sentence = randomNumberPadding(sentence)
    return sentence
}

function yodafy(sentence) {
    sentence = sentence.split(' ')
    const out = []
    // put last item first
    out.push(sentence[sentence.length - 1])

    for ( let i = 0; i < sentence.length - 1; i++) {
        out.push(sentence[i])
    }
    return out
}

function vcCounter(word) {
    word = word.split('')
    let wordMiddle = ''
    const vowels = ['a','e','i','o','u','y']
    const out = []
    let firstLetter = word[0].toUpperCase()
    let lastLetter = word[word.length - 1].toUpperCase()

    // middle of word
    for (let x = 1; x < word.length - 1; x++) {
        wordMiddle+=word[x]
    }

    // count vowels
    let vowelAmount = 0;
    for (let x = 0; x < word.length; x++) {
        if( vowels.includes(word[x]) ) {
            vowelAmount++
        }
    }

    let constantAmount = word.length - vowelAmount

    out.push(firstLetter) // first letter
    out.push(vowelAmount) // vowels
    out.push(wordMiddle) // middle part
    out.push(constantAmount) // constants
    out.push(lastLetter) // lastLetter

    return out.join('')+'!'
}

function domainPadding(sentence, domain) {
    sentence = sentence.join('')
    domain = domain.toLowerCase()
    domain = domain[0] + domain[domain.length -1]
    return sentence + domain
}

function randomNumberPadding(sentence) {
    const min = 100
    const max = 999

    return sentence + (Math.floor(Math.random() * (max - min) + min)).toString()
}