const babelParser = require('@babel/parser')

// 将 script的content 转换为 ast
const parseScriptAst = (content) => {
  const ast = babelParser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx']
  })
  return ast
}

module.exports = {
  parseScriptAst
}
