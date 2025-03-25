export default class Mobile {
    constructor() {
        this.bind()
        this.menu = document.querySelector(".menu")
        this.mobileMenu = document.querySelector(".mobile-menu-sidebar")
        this.mobileMenuOpenButton = document.querySelector(".mobile-menu-sidebar-open")
        this.mobileMenuCloseButton = document.querySelector(".mobile-menu-sidebar-close")
        this.init()
    }

    // Bind events to keep the context of the class
    bind() {
        ['addEvents'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    addEvents() {
        this.mobileMenuOpenButton.addEventListener('click', () => this.toggleMobileMenu())
        this.mobileMenuCloseButton.addEventListener('click', () => this.toggleMobileMenu())
        this.mobileMenu.querySelectorAll(".menu-item").forEach((item) => {
            item.addEventListener('click', () => this.toggleMobileMenuList(item))
        })
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle("active")
    }

    toggleMobileMenuList(item) {
        const pastActiveSubMenuList = this.mobileMenu.querySelector(".sub-menu-mobile-list.active")
        if (pastActiveSubMenuList && pastActiveSubMenuList !== item.querySelector(".sub-menu-mobile-list")) {
            pastActiveSubMenuList.classList.remove("active")
        }
        item.querySelector(".sub-menu-mobile-list").classList.toggle("active")
    }

    changeMenuVariantOnMobile() {
        if (window.innerWidth <= 1024) {
            this.menu.dataset.variant = "tiny"
        }
    }

    init() {
        this.addEvents()
        this.changeMenuVariantOnMobile()
    }
}