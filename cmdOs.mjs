import os from 'os'


export default {
    eol: () => console.log(JSON.stringify(os.EOL)),
    cpuInfo: () => {
        const cpus = os.cpus()
        console.log(`overall amount of CPUS: ${cpus.length}`)
        console.table(cpus, ["model", "speed"])
    },
    homedir: () => console.log(JSON.stringify(os.homedir())),
    username: () => console.log(os.userInfo().username),
    architecture: () => console.log(os.arch())
}