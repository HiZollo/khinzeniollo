export default function iota(value: number) {
  return Array.from({length: value}, (_, i) => i + 1)
}
