export default input => {  
  const elements = []
  const tokens = input.match(new RegExp('"[^"]+"|[\\S]+', 'g'))
  if(tokens) {
    tokens.forEach(element => {
      if (!element) return;
      return elements.push(element)//element.replace(/"/g, ''))
    })
  }
  return elements
}