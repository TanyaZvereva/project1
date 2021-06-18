/* ToDo List:
-переписать функции, которые отвечают за создание элементов используя замыкания, чтобы исбежать повторов кода
-добавить проверку на timeOut с приветствием
-сделать так, что бы сохранялась история изменения аккаунта
-сделать проверку пароля в settings
-сделать сообщение, если введен неверный пароль,email,поле незаполнено и т.д.
-минимизировать вызовы функции querySelector
-переписать функции ChangePassword(избавится от ненужных переменных)
-добавить таймер на сообщение о смене пароля
-создать CSSкласс warning,добавить в него стили,прописать условие,при котором этот класс будет исплльзоваться (log in)!!!!!



*/
/******************************** Renderers ********************************/
function renderHomePage() {
    highlightMenuItem(this)
}

function renderSignUpPage() {
    highlightMenuItem(this)
    addTextInputWithContainer(contentContainer, {
        placeholder: 'First Name',
        classNames: 'first-name'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Last Name',
        classNames: 'last-name'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'E-mail',
        classNames: 'email'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password',
        classNames: 'password'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password (one more time)',
        classNames: 'password-check'
    })
    addButton(contentContainer, 'Create Account', createAccount)
}

function renderLogInPage() {
    highlightMenuItem(this)
    addTextInputWithContainer(contentContainer, {
        placeholder: 'E-mail',
        classNames: 'email'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password',
        classNames: 'password'
    })
    addButton(contentContainer, 'Submit', handleLogIn)
}

function renderSettingsPage() {
    highlightMenuItem(this)
    addTextInputWithContainer(contentContainer, {
        value: currentUser.firstName,
        classNames: 'first-name'
    })
    addTextInputWithContainer(contentContainer, {
        value: currentUser.lastName,
        classNames: 'last-name'
    })
    addTextInputWithContainer(contentContainer, {
        value: currentUser.email,
        classNames: 'email'
    })
    addButton(contentContainer, 'Save', updateAccount, {
        id: 'save-btn'
    })
    addButton(contentContainer, 'Change password', showChangePasswordDialog, {
        id: 'change-password-btn'
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Old password',
        classNames: ['old-password', 'hidden']

    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password',
        classNames: ['password', 'hidden']
    })
    addTextInputWithContainer(contentContainer, {
        placeholder: 'Password (one more time)',
        classNames: ['password-check', 'hidden']
    })
    addButton(contentContainer, 'Save New Password', changePassword, {
        id: 'save-new-pwd',
        classNames: 'hidden'
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
    //     document.querySelector('#save-btn').remove()
    //     addButton(contentContainer, 'Save', updateAccount, {
    //         id: 'save-btn'
    //     })
    document.querySelector('#save-btn').classList.add('hidden')
    document.querySelector('#save-new-pwd').classList.remove('hidden')
}

/******************************** Helpers ********************************/
function createMenu() {
    menuContainer = createContainer(document.body, {
        classNames: 'menu'
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
        classNames: 'hidden'
    })
    addButton(menuContainer, 'Settings', renderSettingsPage, {
        id: 'settings-btn',
        classNames: 'hidden'
    })
}

function handleLogIn() {
    const email = document.querySelectorAll(".email")[0].value
    const password = document.querySelectorAll(".password")[0].value
    if (!email) {
        document.querySelectorAll(".email")[0].classList.add('warning')
        document.querySelectorAll(".email input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }
    if (!password) {
        document.querySelectorAll(".password")[0].classList.add('warning')
        document.querySelectorAll(".password input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }
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
    const firstName = document.querySelectorAll(".first-name input")[0].value
    const lastName = document.querySelectorAll(".last-name input")[0].value
    const email = document.querySelectorAll(".email input")[0].value
    const password = document.querySelectorAll(".password input")[0].value
    const passwordCheck = document.querySelectorAll('.password-check input')[0].value
    const text = document.createElement('p')
    let error

    contentContainer.appendChild(text)

    if (!validateInput(firstName, lastName)) {
        document.querySelectorAll(".first-name")[0].classList.add('warning')
        document.querySelectorAll(".last-name")[0].classList.add('warning')
        error = true
    }

    if (!firstName) {
        document.querySelectorAll(".first-name")[0].classList.add('warning')
        document.querySelectorAll(".first-name input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }
    if (!lastName) {
        document.querySelectorAll(".last-name")[0].classList.add('warning')
        document.querySelectorAll(".last-name input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }
    if (!email) {
        document.querySelectorAll(".email")[0].classList.add('warning')
        document.querySelectorAll(".email input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }
    if (!password) {
        document.querySelectorAll(".password")[0].classList.add('warning')
        document.querySelectorAll(".password input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }
    if (!passwordCheck) {
        document.querySelectorAll('.password-check')[0].classList.add('warning')
        document.querySelectorAll(".password-check input")[0].oninput = function() {
            if (this.value)
                this.parentElement.classList.remove('warning')
            else
                this.parentElement.classList.add('warning')
        }
        error = true
    }

    if (password != passwordCheck) {
        document.querySelectorAll(".password")[0].classList.add('warning')
        document.querySelectorAll('.password-check')[0].classList.add('warning')
        document.querySelectorAll(".password-check input")[0].oninput = function() {
            if (this.value === password) {
                this.parentElement.classList.remove('warning')
                document.querySelectorAll('.password')[0].classList.remove('warning')
            } else {
                this.parentElement.classList.add('warning')
                document.querySelectorAll('.password')[0].classList.add('warning')
            }
        }
        error = true
    }

    if (!error) {
        text.innerText = `Successful registration`
        const user = new User(firstName,lastName,email,password)
        users.push(user)
        document.querySelectorAll(".first-name")[0].value = ""
        document.querySelectorAll(".last-name")[0].value = ""
        document.querySelectorAll(".email")[0].value = ""
        document.querySelectorAll(".password")[0].value = ""
        document.querySelectorAll(".password-check")[0].value = ""
    }
}

function updateAccount() {
    const firstName = document.querySelectorAll(".first-name")[0].value
    const lastName = document.querySelectorAll(".last-name")[0].value
    const email = document.querySelectorAll(".email")[0].value

    if (!validateInput(firstName, lastName))
        return

    if (firstName && lastName && email) {
        currentUser.firstName = firstName
        currentUser.lastName = lastName
        currentUser.email = email
    }
}

function changePassword() {
    const oldPwd = document.querySelectorAll('.old-password input')[0].value
    const newPwd = document.querySelectorAll('.password input')[0].value
    const newPwdCheck = document.querySelectorAll('.password-check input')[0].value
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
function createHTMLElement(tagName) {
    return function(parent, {classNames, id}={}) {
        const element = document.createElement(tagName)
        if (typeof classNames === 'string')
            element.classList.add(classNames)
        else if (classNames && classNames.length)
            element.classList.add(...classNames)
        //             element.classNames = classNames
        //             element.classList.add(classNames)
        if (id)
            element.id = id
        return parent.appendChild(element)
    }
}

const createContainer = createHTMLElement('div')

// function createContainer(parent, {classNames, id}={}) {
//     const element = document.createElement('div')
//     if (classNames)
//         container.classList.add(classNames)
//     if (id)
//         container.id = id
//     return parent.appendChild(container)
// }

function _addTextInput(withContainer) {
    return function(parent, {placeholder, value, classNames, id}={}) {
        if (withContainer) {
            parent = createContainer(parent, {
                classNames,
                id
            })
        }

        const input = createHTMLElement('input')(parent)

        if (placeholder)
            input.placeholder = placeholder
        if (value)
            input.value = value
    }
}

const addTextInputWithContainer = _addTextInput(true)
const addTextInput = _addTextInput(false)

function addButton(parent, text, handler, {classNames, id}={}) {

    const button = createHTMLElement('button')(parent, {
        classNames,
        id
    })

    button.innerText = text
    button.onclick = handler
}

function createTextElement(parent, txt) {
    const p = createHTMLElement('p')(parent)
    p.innerText = txt
}

/******************************** Initialization ********************************/
function init() {
    createMenu()
    contentContainer = createContainer(document.body, {
        classNames: 'page-contents'
    })
    document.querySelector('#home-btn').click()
}
//Global Variables
let contentContainer, menuContainer
const users = []
let currentUser

init()

// window.addEventListener('keydown',function(event){})
