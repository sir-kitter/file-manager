import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'


export default {
  compress: async (srcFilepath, dstFilepath) => await
    pipeline(createReadStream(srcFilepath), createBrotliCompress(), createWriteStream(dstFilepath)),
  decompress: async (srcFilepath, dstFilepath) => await
    pipeline(createReadStream(srcFilepath), createBrotliDecompress(), createWriteStream(dstFilepath))
}