const _addOneUser =user=>{
    document.querySelector("div.menu button:nth-child(2)").click()
    document.querySelector(".first-name").value = user[0]
    document.querySelector(".last-name").value = user[1]
    document.querySelector(".email").value = user[2]
    document.querySelector(".password").value = user[3]
    document.querySelector('.password-check').value = user[3]
    document.querySelector("div.page-contents button").click()
}
const addOneUser = () => {
    _addOneUser(['Tanya','Zvereva','demo@demo','123123'])
}
const addSeveralUsers = ()=>{
    const users = [['Vasya','Ivanov','test@yandex','123456'],['Ivan','Vasiliev','ivan@mail.ru','654321'],['Fedor','Petrov','fedor@yandex.ru','111222']]
    for (const user of users)
        _addOneUser(user)
}
const loginValidUser = () => {
    document.querySelector("div.menu button:nth-child(3)").click()
    document.querySelector(".email").value = 'test@yandex'
    document.querySelector(".password").value = '123456'
    document.querySelector("div.page-contents button").click()
}
const loginInvalidUser = () => {
    document.querySelector("div.menu button:nth-child(3)").click()
    document.querySelector(".email").value = 'test@yandex'
    document.querySelector(".password").value = '123450'
    document.querySelector("div.page-contents button").click()
}

addOneUser()
addSeveralUsers()
loginValidUser()
// loginInvalidUser()