import Headroom from 'headroom.js'

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval)

        hideHeader()
        hideFooter()
    }
    }, 10)
})


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
