import { KeyboardWithColorOptions, KeyboardColor, Keyboard, keyboardColors, keyboards } from "../db/schema"

type KeyboardJoinedColorsRow = {
  keyboards: Keyboard,
  keyboard_colors: KeyboardColor,
}

export const keyboardsJoinedColorRow = {
  id: keyboardColors.id,
  keyboardId: keyboardColors.keyboardId,
  name: keyboards.name,
  isBluetooth: keyboards.isBluetooth,
  isWireless: keyboards.isWireless,
  format: keyboards.format,
  hasRGB: keyboards.hasRGB,
  description: keyboards.description,
  color: keyboardColors.color,
  price: keyboardColors.price,
  stock: keyboardColors.stock,
}

export type KeyboardsJoinedColorsRow = Omit<Keyboard, "id"> & KeyboardColor 
