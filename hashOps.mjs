import { pipeline } from 'node:stream/promises'
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'

import { clogOutput } from './util.mjs'


export default {
  hash: async filepath => {
    await pipeline(createReadStream(filepath), createHash('sha256').setEncoding('hex'), clogOutput())
  }
}