/* ToDo List:
-переписать функции, которые отвечают за создание элементов используя замыкания, чтобы исбежать повторов кода
-добавить проверку на timeOut с приветствием
-сделать так, что бы сохранялась история изменения аккаунта
-сделать проверку пароля в settings
-сделать сообщение, если введен неверный пароль,email,поле незаполнено и т.д.
-минимизировать вызовы функции querySelector
-переписать функции ChangePassword(избавится от ненужных переменных)
-добавить таймер на сообщение о смене пароля
-создать CSSкласс warning,добавить в него стили,прописать условие,при котором этот класс будет исплльзоваться


*/
/******************************** Renderers ********************************/
function renderHomePage() {
    highlightMenuItem(this)
}

function renderSignUpPage() {
    highlightMenuItem(this)
    addTextInputWithContainer(contentContainer, {
        placeholder: 'First Name',
        className: 'first-name'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Last Name',
        className: 'last-name'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'E-mail',
        className: 'email'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password',
        className: 'password'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password (one more time)',
        className: 'password-check'
    })
    addButton(contentContainer, 'Create Account', createAccount)
}

function renderLogInPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, {
        placeholder: 'E-mail',
        className: 'email'
    })
    addTextInput(contentContainer, {
        placeholder: 'Password',
        className: 'password'
    })
    addButton(contentContainer, 'Submit', handleLogIn)
}

function renderSettingsPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, {
        value: currentUser.firstName,
        className: 'first-name'
    })
    addTextInput(contentContainer, {
        value: currentUser.lastName,
        className: 'last-name'
    })
    addTextInput(contentContainer, {
        value: currentUser.email,
        className: 'email'
    })
    addButton(contentContainer, 'Save', updateAccount, {
        id: 'save-btn'
    })
    addButton(contentContainer, 'Change password', showChangePasswordDialog, {
        id: 'change-password-btn'
    })
    addTextInput(contentContainer, {
        placeholder: 'Old password',
        className: 'old-password hidden'

    })
    addTextInput(contentContainer, {
        placeholder: 'Password',
        className: 'password hidden'
    })
    addTextInput(contentContainer, {
        placeholder: 'Password (one more time)',
        className: 'password-check hidden'
    })
}
function showChangePasswordDialog() {
    const oldPassword = document.querySelector('.old-password')
    const password = document.querySelector('.password')
    const passwordCheck = document.querySelector('.password-check')
    oldPassword.classList.toggle('hidden')
    password.classList.toggle('hidden')
    passwordCheck.classList.toggle('hidden')
    const firstName = document.querySelector(".first-name")
    const lastName = document.querySelector(".last-name")
    const email = document.querySelector(".email")
    firstName.classList.toggle('hidden')
    lastName.classList.toggle('hidden')
    email.classList.toggle('hidden')

    document.querySelector('#change-password-btn').classList.toggle('hidden')
    document.querySelector('#save-btn').remove()
    addButton(contentContainer, 'Save', updateAccount, {
        id: 'save-btn'
    })
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
        id: 'log-out-btn',
        className: 'hidden'
    })
    addButton(menuContainer, 'Settings', renderSettingsPage, {
        id: 'settings-btn',
        className: 'hidden'
    })
}

function handleLogIn() {
    const email = document.querySelectorAll(".email")[0].value
    const password = document.querySelectorAll(".password")[0].value
    for (const user of users) {
        if (user.email === email && user.password === password) {
            currentUser = user
            toggleVisibility()
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
    toggleVisibility()
    currentUser = null
    document.querySelector('#home-btn').click()
}

function showGreetings() {
    contentContainer.innerHTML = ''
    createTextElement(contentContainer, `Hello, ${currentUser.firstName}!`)
}

function createAccount() {
    const firstName = document.querySelectorAll(".first-name")[0].value
    const lastName = document.querySelectorAll(".last-name")[0].value
    const email = document.querySelectorAll(".email")[0].value
    const password = document.querySelectorAll(".password")[0].value
    const passwordCheck = document.querySelectorAll('.password-check')[0].value
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
    document.querySelectorAll(".first-name")[0].value = ""
    document.querySelectorAll(".last-name")[0].value = ""
    document.querySelectorAll(".email")[0].value = ""
    document.querySelectorAll(".password")[0].value = ""
    document.querySelectorAll(".password-check")[0].value = ""
}

function updateAccount() {
    const firstName = document.querySelectorAll(".first-name")[0].value
    const lastName = document.querySelectorAll(".last-name")[0].value
    const email = document.querySelectorAll(".email")[0].value
    const oldPwd = document.querySelectorAll(".old-password")[0].value
    const newPwd = document.querySelectorAll('.password')[0].value
    const newPwdCheck = document.querySelectorAll('.password-check')[0].value
    if (!validateInput(firstName, lastName))
        return

    if (firstName && lastName && email) {
        currentUser.firstName = firstName
        currentUser.lastName = lastName
        currentUser.email = email
    }

    if (oldPwd === currentUser.password && newPwd === newPwdCheck) {
        currentUser.password = newPwd
        contentContainer.innerHTML = ''
        const msg = 'Password has been successfully changed'
        createTextElement(contentContainer, msg)
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

function toggleVisibility() {
    const ids = ['log-in-btn', 'sign-up-btn', 'log-out-btn', 'settings-btn']
    for (const id of ids) {
        document.querySelector('#' + id).classList.toggle('hidden')
    }
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

function _addTextInput(withContainer) {
    return function(parent, {placeholder, value, className, id}={}) {
        if(withContainer){
            parent = createContainer(parent)
        }
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
}

const addTextInputWithContainer = _addTextInput(true)
const addTextInput = _addTextInput(false)

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

function createTextElement(parent, txt) {
    const p = document.createElement('p')
    p.innerText = txt
    parent.appendChild(p)
}

/******************************** Initialization ********************************/
function init() {
    createMenu()
    contentContainer = createContainer(document.body, {
        className: 'page-contents'
    })
    document.querySelector('#home-btn').click()
}
//Global Variables
let contentContainer, menuContainer
const users = []
let currentUser

init()

// window.addEventListener('keydown',function(event){})
