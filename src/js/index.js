const menu = document.querySelector('.menu')
const menuItems = document.querySelectorAll('.menu__item')
const burger = document.querySelector('.burger')
const burgerItems = document.querySelectorAll('.burger svg')
const menuActive = document.createElement('img')

menuActive.setAttribute('src', 'dist/img/menu-active.png')
menuActive.style.cssText = 'position: absolute; left: 0; top: 19px'

burger.addEventListener('click', function () {
    menu.classList.toggle('active');

    if (menu.classList.contains('active')) {
        burgerItems.forEach((el) => el.remove())
        burger.innerHTML = '<svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1 1 22.5 23" stroke="#fff" stroke-width="2"/></svg><svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 23 24 1" stroke="#fff" stroke-width="2"/></svg>'
        document.querySelectorAll('.burger svg').forEach(el => {
            el.style.cssText = 'position: absolute;bottom: 37px;'
        })
        burger.style.width = '26px'
    } else {
        document.querySelectorAll('.burger svg').forEach(el => {
            el.remove()
        })
        burgerItems.forEach(el => {
            burger.append(el)
        })
    }
})

menuItems.forEach(el => el.addEventListener('focusin', function () {
    el.style.color = '#8D81AC'
    el.append(menuActive)
}))

menuItems.forEach(el => el.addEventListener('focusout', function () {
    el.style.color = '#fff'
    menuActive.remove()
}))