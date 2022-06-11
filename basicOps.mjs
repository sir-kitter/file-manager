import fs from 'fs'
import { pipeline } from 'node:stream/promises'
import { open } from 'node:fs/promises'
import path from 'node:path'

import { clogOutput } from './util.mjs'


export default {
  cat: async filepath => await pipeline(fs.createReadStream(filepath), clogOutput()),
  add: async filepath => {
    (await open(filepath, 'w'))?.close()
  },
  rn: async (srcFilepath, dstFilepath) => await fs.rename(srcFilepath, dstFilepath, err => {
    if(err) throw new Error('error')
  }),
  cp: async (filepath, folderpath) => {
    const resolvedFilepath = path.resolve(filepath)
    const { base } = path.parse(resolvedFilepath)
    const newFilepath = path.resolve(folderpath, base)
    await pipeline(fs.createReadStream(resolvedFilepath), fs.createWriteStream(newFilepath))
  },
  mv: async (filepath, folderpath) => {
    const { base } = path.parse(path.resolve(filepath))
    const newFilepath = path.resolve(folderpath, base)
    await pipeline(fs.createReadStream(filepath), fs.createWriteStream(newFilepath))
    await fs.unlinkSync(filepath)
  },
  rm: async filepath => await fs.unlinkSync(filepath)
}