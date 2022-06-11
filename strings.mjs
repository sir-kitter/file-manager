const greeting = username => `Welcome to the File Manager, ${username}!`
const farewell = username => `Thank you for using File Manager, ${username}!`

const hintCwd = cwd => `You are currently in ${cwd}`

const errorInvalidInput = 'Invalid input'
const errorOperationFailed = 'Operation failed'


export default { greeting, farewell, hintCwd, errorInvalidInput, errorOperationFailed }