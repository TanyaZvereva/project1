const textarea = document.createElement('textarea')
document.body.appendChild(textarea)
const button = document.createElement('button')
button.innerText = 'Correct language'
button.onclick = correctLanguage
document.body.appendChild(button)
const map = {
    'q': 'й',
    'w': 'ц',
    'e': 'у',
    'r': 'к',
    't': 'е',
    'y': 'н',
    'u': 'г',
    'i': 'ш',
    'o': 'щ',
    'p': 'з',
    '[': 'х',
    ']': 'ъ',
    'a': 'ф',
    's': 'ы',
    'f': 'а',
    'g': 'п',
    'h': 'р',
    'j': 'о',
    'k': 'л',
    ';': 'ж',
    'z': 'я',
    'x': 'ч',
    'c': 'с',
    'v': 'м',
    'm': 'ь',
    ',': 'б',
    '.': 'ю',
    '`': 'ё',
    'd': 'в',
    'l': 'д',
    'b': 'и',
    'n': 'т',
    '': 'э'

}
function correctLanguage() {
    const txt = textarea.value.split('')
    let newTxt = ''
    for (const letter of txt) {
        const newLetter = map[letter]
        newTxt += newLetter ? newLetter : letter
    }
    textarea.value = newTxt
}

textarea.value = 'ddtlbnt pltcm ntrcn lkz gjbcrf'
