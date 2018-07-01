import Headroom from 'headroom.js'

chrome.extension.sendMessage({}, function(response) {
    const readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval)

        watchPopups()
        hideHeader()
        hideFooter()
    }
    }, 10)
})

function watchPopups() {
    const htmlEl = document.querySelector('html')
    
    const observer = new MutationObserver(function (event) {
        removePopup(htmlEl)
    })

    observer.observe(htmlEl, {
      attributes: true, 
      attributeFilter: ['class'],
      childList: false, 
      characterData: false
    })

    removePopup(htmlEl)
}

function removePopup(htmlEl) {
    const isPopupVisible = htmlEl.classList.contains('u-overflowHidden')

    if (!isPopupVisible) return

    // this class prevents page scrolling
    const htmlClassName = "u-overflowHidden"
    htmlEl.classList.remove(htmlClassName)

    const overlayEl = document.querySelector('.overlay')
    overlayEl && overlayEl.remove()
}

function hideHeader() {
    const headerElement = document.querySelector('.js-metabar')
    if (headerElement) {
        const headroomOptions = {
            classes: {
                initial: "ir__header",
                pinned: "ir__header--pinned",
                unpinned: "ir__header--unpinned",
            }
        }

        const headroom  = new Headroom(headerElement, headroomOptions)
        headroom.init()
    }
}

function hideFooter() {
    const footerElement = document.querySelector('.js-stickyFooter')
    if (footerElement) {
        const headroomOptions = {
            classes: {
                initial: "ir__footer",
                pinned: "ir__footer--pinned",
                unpinned: "ir__footer--unpinned"
            }
        }
        const headroom  = new Headroom(footerElement, headroomOptions)
        headroom.init();
    }
}
