import {Clear} from './utils'

const uglifyHtmlPlugin = () => {
  return {
    name: 'uglifyHtmlPlugin', // 必填
    transformIndexHtml(html: string) { // 监听transformIndexHtml这个钩子
      const replaceObj = new Clear(html)
      // 构建者模式：先去除空格与换行符，再去除注释
      replaceObj.clear(/[\n\r]*/g).clear(/<!--[\w\W\r\n]*?-->/gmi)
      // 返回处理完毕后的html
      return replaceObj.htmlStr
    }
  }
}

export default uglifyHtmlPlugin