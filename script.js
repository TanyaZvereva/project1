/* ToDo List:
-переписать функции, которые отвечают за создание элементов используя замыкания, чтобы исбежать повторов кода
-добавить проверку на timeOut с приветствием
-сделать так, что бы сохранялась история изменения аккаунта
-сделать проверку пароля в settings
-переписать Id с camelCase на kebab-case
-сделать сообщение, если введен неверный пароль,email,поле незаполнено и т.д.
-скрыть кнопку settings


*/
/******************************** Renderers ********************************/
function renderHomePage() {
    highlightMenuItem(this)
}

function renderSignUpPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, {
        placeholder: 'First Name',
        id: 'firstName'
    })
    addTextInput(contentContainer, {
        placeholder: 'Last Name',
        id: 'lastName'
    })
    addTextInput(contentContainer, {
        placeholder: 'E-mail',
        id: 'email'
    })
    addTextInput(contentContainer, {
        placeholder: 'Password',
        id: 'password'
    })
    addTextInput(contentContainer, {
        placeholder: 'Password (one more time)',
        id: 'password-check'
    })
    addButton(contentContainer, 'Create Account', createAccount)
}

function renderLogInPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, {
        placeholder: 'E-mail',
        id: 'email'
    })
    addTextInput(contentContainer, {
        placeholder: 'Password',
        id: 'password'
    })
    addButton(contentContainer, 'Submit', handleLogIn)
}

function renderSettingsPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, {
        value: currentUser.firstName,
        id: 'firstName'
    })
    addTextInput(contentContainer, {
        value: currentUser.lastName,
        id: 'lastName'
    })
    addTextInput(contentContainer, {
        value: currentUser.email,
        id: 'email'
    })
    addTextInput(contentContainer, {
        value: currentUser.password,
        id: 'password'
    })
    addButton(contentContainer, 'Save', updateAccount)
}

/******************************** Helpers ********************************/
function createMenu() {
    menuContainer = createContainer(document.body, {
        className: 'menu'
    })
    addButton(menuContainer, 'Home', renderHomePage, {
        id: 'home-btn'
    })
    addButton(menuContainer, 'Sign Up', renderSignUpPage, {
        id: 'sign-up-btn'
    })
    addButton(menuContainer, 'Log In', renderLogInPage, {
        id: 'log-in-btn'
    })
    addButton(menuContainer, 'Log Out', handleLogOut, {
        id: 'log-out-btn'
    })
    addButton(menuContainer, 'Settings', renderSettingsPage, {
        id: 'settings-btn'
    })
}

function handleLogIn() {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    for (const user of users) {
        if (user.email === email && user.password === password) {
            currentUser = user
            document.querySelector('#log-in-btn').style.display = "none"
            document.querySelector('#sign-up-btn').style.display = "none"
            document.querySelector('#log-out-btn').style.display = ""
            document.querySelector('#settings-btn').style.display = ""
            showGreetings()
            document.querySelector('#home-btn').classList.add('selected')
            setTimeout(()=>document.querySelector('#home-btn').click(), 3000)
            return
        }
    }
    if (!document.querySelector("p.error")) {
        const text = document.createElement('p')
        text.classList.add('error')
        contentContainer.appendChild(text)
        text.innerText = 'Incorrect login/password'
    }
}

function handleLogOut() {
    document.querySelector('#log-in-btn').style.display = ""
    document.querySelector('#sign-up-btn').style.display = ""
    document.querySelector('#log-out-btn').style.display = "none"
    document.querySelector('#settings-btn').style.display = "none"
    currentUser = null
    document.querySelector('#home-btn').click()
}

function showGreetings() {
    contentContainer.innerHTML = ''
    const text = document.createElement('p')
    contentContainer.appendChild(text)
    text.innerText = `Hello, ${currentUser.firstName}!`
}

function createAccount() {
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const passwordCheck = document.querySelector('#password-check').value
    const text = document.createElement('p')
    contentContainer.appendChild(text)

    if (!validateInput(firstName, lastName))
        return

    if (!firstName && !lastName && !password && !email)
        return

    if (password != passwordCheck)
        return

    text.innerText = `Successful registration`
    const user = new User(firstName,lastName,email,password)
    users.push(user)
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
    document.querySelector("#password-check").value = ""
}

function updateAccount() {
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    if (!validateInput(firstName, lastName))
        return

    if (firstName && lastName && password && email) {
        currentUser.firstName = firstName
        currentUser.lastName = lastName
        currentUser.email = email
        currentUser.password = password
    }

}

function validateInput(firstName, lastName) {
    const forbiddenChars = '0123456789*&^%$#)'
    const len = firstName.length > lastName.length ? firstName.length : lastName.length

    for (let i = 0; i < len; i++) {
        if (forbiddenChars.includes(firstName[i]) || forbiddenChars.includes(lastName[i]))
            return false
    }
    return true
}

function highlightMenuItem(menuItem) {
    for (const btn of menuContainer.children)
        btn.classList.remove('selected')
    contentContainer.innerHTML = ''
    menuItem.classList.add('selected')
}

/******************************** Constructors ********************************/
class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}
/******************************** Creating HTML elements ********************************/
function createContainer(parent, {className, id}={}) {
    const container = document.createElement('div')
    if (className)
        container.classList.add(className)
    if (id)
        container.id = id
    return parent.appendChild(container)
}
function _addTextInput(parent, placeholder, id) {
    const input = document.createElement('input')
    input.id = id
    input.type = 'text'
    input.placeholder = placeholder
    parent.appendChild(input)
}
function addTextInput(parent, {placeholder, value, className, id}={}) {
    const input = document.createElement('input')
    input.type = 'text'
    if (placeholder)
        input.placeholder = placeholder
    if (value)
        input.value = value
    if (className)
        input.className = className
    if (id)
        input.id = id
    parent.appendChild(input)
}
function addButton(parent, text, handler, {className, id}={}) {
    const button = document.createElement('button')
    button.innerText = text
    button.onclick = handler
    if (className)
        button.classList.add(className)
    if (id)
        button.id = id
    parent.appendChild(button)
}
/******************************** Initialization ********************************/
function init() {
    createMenu()
    contentContainer = createContainer(document.body, {
        className: 'page-contents'
    })
    document.querySelector('#home-btn').click()
    document.querySelector('#log-out-btn').style.display = "none"
}
//Global Variables
let contentContainer, menuContainer
const users = []
let currentUser

init()

// window.addEventListener('keydown',function(event){})
