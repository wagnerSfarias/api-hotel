import { unlink } from 'node:fs'

const deleteFiles = (filename) => {
  unlink(`uploads/${filename}`, (err) => {
    if (err) {
      console.log('Erro', err)
    }
    console.log(`${filename}, was deleted.`)
  })
}
export default deleteFiles
