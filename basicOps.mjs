import fs from 'fs'
import { pipeline } from 'node:stream/promises'
import { open } from 'node:fs/promises'
import path from 'node:path'

import { clogOutput } from './util.mjs'
import strings from './strings.mjs'


export default {
  cat: async filepath => await pipeline(fs.createReadStream(filepath), clogOutput()),
  add: async filename => {
    if(filename != path.basename(filename)) throw new Error(strings.errorInvalidInput)
    await (await open(filename, 'w'))?.close()
  },
  rn: async (srcFilepath, dstFilename) => {
    if(dstFilename != path.basename(dstFilename)) throw new Error(strings.errorInvalidInput)
    await fs.rename(srcFilepath, dstFilename, err => {
      if(err) throw new Error(strings.errorOperationFailed)
    })
  },
  cp: async (filepath, folderpath) => {
    await pipeline(fs.createReadStream(filepath), fs.createWriteStream(path.join(folderpath, path.basename(filepath))))
  },
  mv: async (filepath, folderpath) => {
    await pipeline(fs.createReadStream(filepath), fs.createWriteStream(path.join(folderpath, path.basename(filepath))))
    await fs.unlinkSync(filepath)
  },
  rm: async filepath => await fs.unlinkSync(filepath)
}