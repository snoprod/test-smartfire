export default class MainMenu {
    constructor() {
        this.bind()
        this.menu = document.querySelector(".menu")
        this.menuItems = document.querySelectorAll(".menu-item-link[data-target]")
        this.subMenus = document.querySelectorAll(".sub-menu")
        this.menuLanguage = document.querySelector(".current-language")
        this.languageList = document.querySelector(".language-list")
        this.init()
    }

    // Bind events to keep the context of the class
    bind() {
        ['addEvents'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    addEvents() {
        this.menuItems.forEach((item) => {
            item.addEventListener('click', () => this.toggleSubMenu(item))
        })
        this.menuLanguage.addEventListener('click', () => this.toggleMenuLanguage())
        this.languageList.addEventListener('click', () => this.toggleMenuLanguage())
    }

    // Toggle menu language on click on language item
    toggleMenuLanguage() {
        const menuLanguage = document.querySelector(".language-list")
        menuLanguage.classList.toggle('active')
    }

    // Toggle sub-menu on click on menu item
    toggleSubMenu(item) {
        const target = item.dataset.target
        const pastActiveSubMenu = document.querySelector(".sub-menu.active")
        if (pastActiveSubMenu) {
            pastActiveSubMenu.classList.remove('active')
        }
        const subMenu = document.querySelector("#" + target)
        subMenu.classList.toggle('active')
        const pastActiveSubMenuList = document.querySelector(".sub-menu-list.active")
        if (pastActiveSubMenuList) {
            pastActiveSubMenuList.classList.remove('active')
        }
        subMenu.querySelector(".sub-menu-list").classList.add('active')
        const selectorItems = subMenu.querySelectorAll(".sub-menu-selector-item")
        this.unactiveSubMenuSelectorItem()
        if(selectorItems.length > 0){
            selectorItems[0].classList.add('active')
            selectorItems.forEach((item) => {
                item.addEventListener('click', () => {
                    this.toggleSubMenuList(item)
                })
            })
        }
    }

    // Unactive all sub-menu selector items
    unactiveSubMenuSelectorItem() {
        const pastActiveSubMenu = document.querySelectorAll(".sub-menu-selector-item.active")
        if (pastActiveSubMenu) {
            pastActiveSubMenu.forEach((item) => {
                item.classList.remove('active')
            })
        }
    }

    // Toggle sub-menu list on click on selector item
    toggleSubMenuList(item) {
        const target = item.dataset.targetCategory
        const pastActiveSubMenuList = document.querySelector(".sub-menu-list.active")
        const pastActiveSubMenu = document.querySelector(".sub-menu-selector-item.active")
        if (pastActiveSubMenuList) {
            pastActiveSubMenuList.classList.remove('active')
        }
        if (pastActiveSubMenu) {
            pastActiveSubMenu.classList.remove('active')
        }
        const subMenuList = document.querySelector(".sub-menu-list[data-category=" + `"${target}"` + "]")
        subMenuList.classList.toggle('active')
        item.classList.add('active')
    }

    // Close all sub-menus on mouseleave
    closeSubMenu() {
        this.menu.addEventListener('mouseleave', () => {
            this.subMenus.forEach((subMenu) => {
                subMenu.classList.remove('active')
                subMenu.querySelectorAll(".sub-menu-selector-item").forEach((item) => {
                    item.classList.remove('active')
                })
                subMenu.querySelectorAll(".sub-menu-list").forEach((item) => {
                    item.classList.remove('active')
                })
            })
        })
    }

    init() {
        this.addEvents()
        this.closeSubMenu()
    }
}