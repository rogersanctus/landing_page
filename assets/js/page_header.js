import { FIT_MENU } from "./consts"

(function() {
  let wasMobileSizingToggled = false
  let oldFitMenu = false

  function toggleNavMenu(isMenuOpen) {
    const navMenu = document.querySelector('header nav')

    if(navMenu) {
      if(isMenuOpen) {
        navMenu.classList.remove('hidden')
      } else {
        navMenu.classList.add('hidden')
      }
    }
  }

  function getIsMenuOpen() {
    const isMenuOpen = localStorage.getItem('isMenuOpen') ?? 'false'

    return isMenuOpen === 'true'
  }

  function onLoad() {
    const menuButton = document.querySelector('#mobile-menu-button')
    let isMenuOpen = getIsMenuOpen()

    toggleNavMenu(isMenuOpen)
    processWindowSize()

    if(menuButton) {
      menuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen
        localStorage.setItem('isMenuOpen', isMenuOpen)
        toggleNavMenu(isMenuOpen)
      })
    }
  }

  function processWindowSize() {
    let fitMenu = false

    if(window.innerWidth >= FIT_MENU) {
      fitMenu = true
    }

    if(window.innerWidth < FIT_MENU) {
      fitMenu = false
    }

    if(!wasMobileSizingToggled) {
      oldFitMenu = fitMenu

      if(fitMenu) {
        console.log('fit menu')
        toggleNavMenu(true)
      } else {
        console.log('not fit menu')
        toggleNavMenu(getIsMenuOpen())
      }

      wasMobileSizingToggled = true
    }

    if(oldFitMenu !== fitMenu) {
      wasMobileSizingToggled = false
    }
  }

  function onWindowResize() {
    processWindowSize()
  }

  window.addEventListener('load', onLoad)
  window.addEventListener('resize', onWindowResize)

  window.addEventListener('unload', () => {
    window.removeEventListener('load', this)
    window.removeEventListener('resize', onWindowResize)
  })
}())
