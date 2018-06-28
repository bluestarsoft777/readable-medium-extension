const fs = require('fs')
const zipFolder = require('zip-folder')
const path = require('path')
const Bundler = require('parcel-bundler')

// Build process

buildScript()
.then(() => zipExtension())
.then(() => {
    console.log('Build finished.')
    process.exit(0)
})
.catch(error => {
    console.error(error)
    process.exit(1)
})

// Build process implementation

async function buildScript() {
    const inputFile = path.join(__dirname, '../src/improveReadability.js')

    const options = {
        target: 'browser',
        outDir: './extension/src',
    }

    const bundler = new Bundler(inputFile, options)
    const bundle = await bundler.bundle()    
}


function zipExtension() {
    const extensionDirPath = 'extension'
    const extensionZipName = 'extension.zip'

    if (!fs.existsSync(extensionDirPath)) {
        throw Error(`Cannot run build, ${extensionDirPath} is missing, exiting...`)
        process.exit(1)
    }

    const extensionScriptPath = path.join(__dirname, `../${extensionDirPath}`, 'src/improveReadability.js')
    if (!fs.existsSync(extensionScriptPath)) {
        throw Error(`Cannot run build, ${extensionScriptPath} is missing, exiting...`)
        process.exit(1)
    }

    return new Promise((resolve, reject) => {
        zipFolder(extensionDirPath, extensionZipName, error => {
            if (error) {
                reject('Error occured while zipping the extension: ' + error)
            }

            resolve()
        })
    })
}