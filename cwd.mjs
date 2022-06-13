import os from 'os'

import strings from './strings.mjs'


const print = () => console.info(strings.hintCwd(process.cwd()))

const goHome = () => {
    const homedir = os.homedir()
    try {
        process.chdir(homedir)
    } catch(err) {
        console.log('Unable to start from home directory "${homedir}"')
    }
}

export default { print, goHome }