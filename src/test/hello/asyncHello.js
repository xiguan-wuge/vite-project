export const testTimeout = (name, cb) => {
  return setTimeout(() => {
    cb(`hello ${name}`)
  }, 1000)
}

export const testPromise = (name) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`hello ${name}`)
    }, 1000)
  })
}