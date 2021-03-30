function createMenu(){
	const container = document.createElement('div')
	container.classList.add('menu')
	document.body.appendChild(container)
	addButton(container,'Home', renderHomePage)
	addButton(container,'Sign Up', renderSignUpPage)
}
function renderHomePage() {

}
function renderSignUpPage() {
	
}
class User {
 constructor(name, surname, email, password) {
   this.name = name
   this.surname = surname
   this.email = email
   this.password = password
 }
}

function createAccount(){
    const firstName = document.querySelector("#name").value
    const lastName = document.querySelector("#surname").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const text = document.querySelector("p")
    
    
		if(!validateInput(firstName, lastName))
    		return
    
		if(firstName && lastName && password && email) {
        text.innerText = `Successful registration`
        const user = new User(firstName, lastName, email, password)
        users.push(user)
        console.log(users[0])
        document.querySelector("#name").value = ""
        document.querySelector("#surname").value = ""
        document.querySelector("#email").value = ""
        document.querySelector("#password").value = ""
    }
}

const users = []
function validateInput(firstName, lastName) {
		const forbiddenChars = '0123456789*&^%$#)'
    const len = firstName.length > lastName.length ? firstName.length : lastName.length
    
  	for(let i = 0; i < len; i++) {
    		if (forbiddenChars.includes(firstName[i]) || forbiddenChars.includes(lastName[i]))
        		return false
    }
    return true
}
function addTextInput(parent, placeholder, id) {
	const input = document.createElement('input')
	input.id = id
    input.type = 'text'
    input.placeholder = placeholder
    parent.appendChild(input)
}
function addButton(parent, text, handler) {
	const button = document.createElement('button')
    button.innerText = text
    button.onclick = handler
    parent.appendChild(button)
}

function renderCreateAccountForm() {
    addTextInput(document.body, 'Name', 'name')
    addTextInput(document.body, 'Surnameame', 'surname')
    addTextInput(document.body, 'E-mail', 'email')
    addTextInput(document.body, 'Password', 'password')
    addButton(document.body,'Create Account', createAccount)
}

function init() {
	  renderCreateAccountForm()
    const text = document.createElement('p')
    document.body.appendChild(text)
}

init()