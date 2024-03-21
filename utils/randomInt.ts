export default function randomInt(min: number, max: number) {
  return ~~(Math.random() * (max - min + 1) + min)
}
