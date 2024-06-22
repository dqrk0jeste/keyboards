import { db } from "../db";
import { KeyboardWithColorOptions, KeyboardColor, Keyboard, keyboardColors, keyboards } from "../db/schema";

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

export function translateToKeyboardWithColorOptions(keyboards: KeyboardJoinedColorsRow[]): KeyboardWithColorOptions[] {
  const response = [] as KeyboardWithColorOptions[]

  for(let i = 0; i < keyboards.length; i++) {
    if(i === 0 || keyboards[i].keyboards.id !== keyboards[i - 1].keyboards.id) {
      response.push({
        ...keyboards[i].keyboards,
        colorOptions: [{
          id: keyboards[i].keyboard_colors.id,
          color: keyboards[i].keyboard_colors.color as Color,
          price: keyboards[i].keyboard_colors.price,
          stock: keyboards[i].keyboard_colors.stock,
        }],
      })
    } else {
      response[response.length - 1].colorOptions.push({
        id: keyboards[i].keyboard_colors.id,
        color: keyboards[i].keyboard_colors.color as Color,
        price: keyboards[i].keyboard_colors.price,
        stock: keyboards[i].keyboard_colors.stock,
      })
    }
  }
  
  return response
}

