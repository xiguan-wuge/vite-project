/**
 * 清除类
 * 采用构建者模式开发
 * 每次执行后，将this返回，以供链式调用
 */
export class Clear {
  htmlStr: string;
  constructor(str: string) {
    this.htmlStr = str
  }

  clear(reg: RegExp) {
    if (!reg) return this

    this.htmlStr = this.htmlStr.replace(reg, '')
    return this
  }

  replace(reg: RegExp, text: string) {
    if(!reg) return this

    this.htmlStr = this.htmlStr.replace(reg, text)

    return  this
  }
}