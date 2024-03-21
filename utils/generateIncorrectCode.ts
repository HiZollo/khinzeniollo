import shuffle from './shuffle'
import randomInt from './randomInt'

export const LENGTH = 32
export const CHAR_PACK = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

export default function generateIncorrectCode() {
  const arr = ['H', 'i', 'Z', 'o', 'l', 'l', 'o']
  for (let i = 0; i < LENGTH; ++i) {
    const index = randomInt(0, CHAR_PACK.length-1)
    arr.push(CHAR_PACK[index])
  }
  shuffle(arr)
  return arr.join('')
}
