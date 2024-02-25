interface BlankDivParam {
  height: string;
}

export function BlankDiv({ height }: BlankDivParam) {
  return <div style={{ height }} />
}
