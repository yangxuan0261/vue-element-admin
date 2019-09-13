// const fs = require('fs')
const fs = require('browserify-fs')

const CUtils = {
    wirteFile: async function(path, content) {
        return new Promise((resolve) => {
            fs.writeFile(path, content, function(err) {
                if (err) throw err;
                resolve()
            })
        })
    },

    readFile: async function(path) {
        const isExist = this.isFileExists(path)
        return new Promise((resolve) => {
            if (!isExist) {
                resolve('')
                return
            }
            fs.readFile(path, 'utf8', function(err, data) {
                if (err) throw err;
                resolve(data)
            })
        })
    },

    isFileExists: function(path) {
        return fs.existsSync(path)
    },

    printCallStack: function() {
        // var i = 0;
        // var fun = arguments.callee;
        // do {
        //     fun = fun.arguments.callee.caller;
        //     console.log(++i + ': ' + fun);
        // } while (fun);
    }
}

const utils = Object.create(CUtils)

export default utils
