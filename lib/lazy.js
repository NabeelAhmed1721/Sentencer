import * as mnemonicId from 'mnemonic-id'
// Why are you here??
export default function lazy() {
    var id = mnemonicId.createLongNameId()
    var sentence = id.split('-')
    // capitalize first letter for fanciness
    var firstWord = sentence[0].split('')
    firstWord[0] = firstWord[0].toUpperCase()
    firstWord = firstWord.join('')
    // add to rest of sentence
    sentence[0] = firstWord


    return sentence.join(' ')
}