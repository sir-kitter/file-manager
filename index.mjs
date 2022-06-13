import os from 'os'
import readline from 'node:readline'
import path from 'path'

import strings from './strings.mjs'
import cwd from './cwd.mjs'
import cmdOs from './cmdOs.mjs'
import parseCmd from './parseCmd.mjs'
import nwd from './nwd.mjs'
import basicOps from './basicOps.mjs'
import { unquote } from './util.mjs'
import hashOps from './hashOps.mjs'
import codecOps from './codecOps.mjs'


const params = Object.fromEntries(process.argv.slice(2).map(a => a.split('=')))
const username = params['--username']

cwd.goHome()
console.log(strings.greeting(username))
cwd.print()


const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.on('SIGINT', () => rl.close())
  .on('close', () => {
    console.log(strings.farewell(username))
    process.exit(0)
  })
  .on('line', async line => {
    const [cmd, ...args] = parseCmd(line)
    try {
      switch(cmd) {
        case ".exit": {
          rl.close()
          break
        }
        case 'up': {
          await nwd.up()
          break
        }
        case 'ls': {
          await nwd.ls()
          break
        }
        case 'cd': {
          if(args.length == 1) {
            await nwd.cd(unquote(args[0]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'cat': {
          if(args.length == 1) {
            await basicOps.cat(unquote(args[0]))
            console.log()
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'add': {
          if(args.length == 1) {
            await basicOps.add(unquote(args[0]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'rn': {
          if(args.length == 2) {
            await basicOps.rn(unquote(args[0]), unquote(args[1]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'cp': {
          if(args.length == 2) {
            await basicOps.cp(unquote(args[0]), unquote(args[1]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'mv': {
          if(args.length == 2) {
            await basicOps.mv(unquote(args[0]), unquote(args[1]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'rm': {
          if(args.length == 1) {
            await basicOps.rm(unquote(args[0]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'os': {
          if(args.length == 1) {
            switch(args[0]) {
              case '--EOL': {
                cmdOs.eol()
                break
              }
              case '--cpus': {
                cmdOs.cpuInfo()
                break
              }
              case '--homedir': {
                cmdOs.homedir()
                break
              }
              case '--username': {
                cmdOs.username()
                break
              }
              case '--architecture': {
                cmdOs.architecture()
                break
              }
              default: {
                console.log(strings.errorInvalidInput)
              }
            }
            break
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'hash': {
          if(args.length == 1) {
            await hashOps.hash(unquote(args[0]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'compress': {
          if(args.length == 2) {
            await codecOps.compress(unquote(args[0]), unquote(args[1]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        case 'decompress': {
          if(args.length == 2) {
            await codecOps.decompress(unquote(args[0]), unquote(args[1]))
          } else {
            console.log(strings.errorInvalidInput)
          }
          break
        }
        default: {
          console.log(strings.errorInvalidInput)
        }
      }
    } catch(err) {
      if((err instanceof Error) && err.message == strings.errorInvalidInput) {
        console.log(strings.errorInvalidInput)
      } else {
        console.log(strings.errorOperationFailed)
      }
    }
    
    cwd.print()
    rl.prompt()
  })
  .setPrompt('> ')

rl.prompt()