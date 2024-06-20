export const formats = [
  '60%',
  '65%',
  '75%',
  'TKL',
  '100%',
] as const

export type Format = typeof formats[number]

export const switchTypes = [
  "linear",
  "tactile",
  "clicky",
  "silent",
] as const 

export type SwitchType = typeof switchTypes[number]

export const colors = [
  "white",
  "black",
  "blue",
  "red",
  "yellow",
  "green",
  "purple",
  "orange",
  "pink",
] as const

export type Color = typeof colors[number]
