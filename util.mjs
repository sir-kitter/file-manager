import { Writable } from 'node:stream'


export const unquote = string => {
  if(string.length > 1 && string[0] == '"' && string[string.length - 1] == '"') {
    return string.slice(1, string.length - 1)
  }
  return string
}

export const clogOutput = () => new Writable({
  decodeStrings: true,
  write(chunk, _, callback) {
    console.log(chunk.toString())
    callback()
  },
})
