import { readdir } from 'node:fs/promises'


export default {
    up: async () => process.chdir('..'),
    ls: async () => console.table(await readdir('.')),
    cd: async folderPath => process.chdir(folderPath)
}