/* ToDo List:
-функция rendererSettingsPage
-переписать функции, которые отвечают за создание элементов используя замыкания, чтобы исбежать повторов кода
-переписать функцию _addTextInput на addTextInput
-добавить проверку на timeOut с приветствием
-сделать так, что бы сохранялась история изменения аккаунта
-поменять name и surname на firstName и lastName

*/
/******************************** Renderers ********************************/
function renderHomePage() {
    highlightMenuItem(this)
}

function renderSignUpPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, 'First Name', 'name')
    addTextInput(contentContainer, 'Last Name', 'surname')
    addTextInput(contentContainer, 'E-mail', 'email')
    addTextInput(contentContainer, 'Password', 'password')
    addButton(contentContainer, 'Create Account', createAccount)
}

function renderLogInPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, 'E-mail', 'email')
    addTextInput(contentContainer, 'Password', 'password')
    addButton(contentContainer, 'Submit', handleLogIn)
}

function renderSettingsPage() {
    highlightMenuItem(this)
    addTextInput(contentContainer, 'First Name', 'name')
    addTextInput(contentContainer, 'Last Name', 'surname')
    addTextInput(contentContainer, 'E-mail', 'email')
    addTextInput(contentContainer, 'Password', 'password')
    addButton(contentContainer, 'Save', updateAccount)
}


/******************************** Helpers ********************************/
function createMenu() {
    menuContainer = createContainer(document.body, {
        className: 'menu'
    })
    addButton(menuContainer, 'Home', renderHomePage, {id: 'home-btn'})
    addButton(menuContainer, 'Sign Up', renderSignUpPage, {id: 'sign-up-btn'})
    addButton(menuContainer, 'Log In', renderLogInPage, {id: 'log-in-btn'})
    addButton(menuContainer, 'Log Out', handleLogOut, {id: 'log-out-btn'})
    addButton(menuContainer, 'Settings', renderSettingsPage, {id: 'settings-btn'})
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
    text.innerText = `Hello, ${currentUser.name}!`
}

function createAccount() {
    const firstName = document.querySelector("#name").value
    const lastName = document.querySelector("#surname").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const text = document.createElement('p')
    contentContainer.appendChild(text)

    if (!validateInput(firstName, lastName))
        return

    if (firstName && lastName && password && email) {
        text.innerText = `Successful registration`
        const user = new User(firstName,lastName,email,password)
        users.push(user)
        document.querySelector("#name").value = ""
        document.querySelector("#surname").value = ""
        document.querySelector("#email").value = ""
        document.querySelector("#password").value = ""
    }
}

function updateAccount() {
    const firstName = document.querySelector("#name").value
    const lastName = document.querySelector("#surname").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    if (!validateInput(firstName, lastName))
        return

    if (firstName && lastName && password && email) {
       currentUser.name = firstName
       currentUser.surname = lastName
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
    constructor(name, surname, email, password) {
        this.name = name
        this.surname = surname
        this.email = email
        this.password = password
    }
}
/******************************** Creating HTML elements ********************************/
function createContainer(parent, {className, id} = {}) {
    const container = document.createElement('div')
    if (className)
        container.classList.add(className)
    if (id)
        container.id = id
    return parent.appendChild(container)
}
function addTextInput(parent, placeholder, id) {
    const input = document.createElement('input')
    input.id = id
    input.type = 'text'
    input.placeholder = placeholder
    parent.appendChild(input)
}
function _addTextInput(parent, {placeholder, value, className, id}={}) {
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
function addButton(parent, text, handler, {className, id} = {}) {
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
