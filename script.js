/* ToDo List:
-переписать функции, которые отвечают за создание элементов используя замыкания, чтобы исбежать повторов кода
-добавить проверку на timeOut с приветствием
-сделать так, что бы сохранялась история изменения аккаунта
-сделать проверку пароля в settings
-сделать сообщение, если введен неверный пароль,email,поле незаполнено и т.д.
-минимизировать вызовы функции querySelector
-дописать функцию ChangePassword


*/
/******************************** Renderers ********************************/
function renderHomePage() {
    highlightMenuItem(this)
}

function renderSignUpPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, {
        placeholder: 'First Name',
        className: 'first-name'
    })
    addTextInput(contentContainer, {
        placeholder: 'Last Name',
        className: 'last-name'
    })
    addTextInput(contentContainer, {
        placeholder: 'E-mail',
        className: 'email'
    })
    addTextInput(contentContainer, {
        placeholder: 'Password',
        className: 'password'
    })
    addTextInput(contentContainer, {
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
     addButton(contentContainer, 'Change password', showChangePasswordDialog, {
        id: 'change-password-btn'
    })
    addTextInput(contentContainer, {
        placeholder: 'Old password',
        className: 'old-password'
    })
     addTextInput(contentContainer, {
        placeholder: 'Password',
        className: 'password'
    })
     addTextInput(contentContainer, {
        placeholder: 'Password (one more time)',
        className: 'password-check'
    })
    addButton(contentContainer, 'Save', updateAccount)
}
function showChangePasswordDialog() {
    
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
    const text = document.createElement('p')
    contentContainer.appendChild(text)
    text.innerText = `Hello, ${currentUser.firstName}!`
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
    const password = document.querySelectorAll(".password")[0].value
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

function toggleVisibility() {
    const ids = ['log-in-btn', 'sign-up-btn', 'log-out-btn', 'settings-btn']
    for(const id of ids) {
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
}
//Global Variables
let contentContainer, menuContainer
const users = []
let currentUser

init()

// window.addEventListener('keydown',function(event){})
