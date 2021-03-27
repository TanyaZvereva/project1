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


function renderCreateAccountForm() {
    const nameInput = document.createElement('input')
    const surnameInput = document.createElement('input')
    const email = document.createElement('input')
    const password = document.createElement('input')
    const button = document.createElement('button')
    
    nameInput.id = 'name'
    nameInput.type = 'text'
    nameInput.placeholder = 'Name'
    surnameInput.id = 'surname'
    surnameInput.placeholder = 'Surname'
    email.id = 'email'
    email.placeholder = 'E-mail'
    password.id = 'password'
    password.placeholder = 'Password'
    button.innerText = 'Create Account'
    button.onclick = createAccount
    
    document.body.appendChild(nameInput)
    document.body.appendChild(surnameInput)
    document.body.appendChild(email)
    document.body.appendChild(password)
    document.body.appendChild(button)
}

function init() {
		renderCreateAccountForm()
    const text = document.createElement('p')
    document.body.appendChild(text)
}

init()