import { pgTable, uuid, integer, varchar, text, index, boolean, primaryKey, pgEnum, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const keyboardFormatOptions = pgEnum('keyboard_format_options', [
  '60%',
  '65%',
  '75%',
  'TKL',
  '100%',
])

export const keyboards = pgTable('keyboards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  isBluetooth: boolean('is_bluetooth').notNull(),
  isWireless: boolean('is_wireless').notNull(),
  format: keyboardFormatOptions('format').notNull(), 
  isPrebuilt: boolean('prebuilt').notNull(),
  price: integer('price').notNull(),
  description: text('description'),
}, (table) => {
    return {
      nameIndex: index('name_index').on(table.name),
      priceIndex: index('keyboard_price_index').on(table.price),
    }
  }
)

export type Keyboard = typeof keyboards.$inferSelect 
export type NewKeyboard = typeof keyboards.$inferInsert

export const insertKeyboardSchema = createInsertSchema(keyboards)

export const keyboardColors = pgTable('keyboard_colors', {
  color: varchar('color', {
    length: 255,
  }).notNull(),
  keyboardId: uuid('keyboard_id').references(() => keyboards.id).notNull(),
  stock: integer('stock').notNull(),
}, (table) => {
    return {
      pk: primaryKey({
        columns: [table.color, table.keyboardId],
      }),
    }
 }
)

export type KeyboardColor = typeof keyboardColors.$inferSelect 
export type NewKeyboardColor = typeof keyboardColors.$inferInsert

export const insertKeyboardColorSchema = createInsertSchema(keyboardColors)

export const switchTypes = pgEnum('switch_types', [
  'linear',
  'tactile',
  'clicky',
  'silent',
])

export const switches = pgTable('switches', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  type: switchTypes('type').notNull(),
  stock: integer('stock').notNull(),
  description: text('description'),
})

export type Switch = typeof switches.$inferSelect
export type NewSwitch = typeof switches.$inferInsert

export const insertSwitchSchema = createInsertSchema(switches)

export const keycaps = pgTable('keycaps', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  mainColor: varchar('main_color', {
    length: 255,
  }).notNull(),
  accentColors: varchar('accent_colors', {
    length: 255,
  }),
  isPudding: boolean('is_pudding').notNull(),
  stock: integer('stock').notNull(),
  description: text('description'),
})

export type Keycap = typeof keycaps.$inferSelect
export type NewKeycap = typeof keycaps.$inferInsert

export const insertKeycapsSchema = createInsertSchema(keycaps)

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  keyboardId: uuid('keyboard_id').references(() => keyboards.id).notNull(),
  switchId: uuid('switch_id').references(() => switches.id).notNull(),
  keycapId: uuid('keycap_id').references(() => keycaps.id).notNull(),
  handlubedSwitches: boolean('handlubed_switches').notNull(),
  extraFoam: boolean('extra_foam').notNull(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  phoneNumber: varchar('phone_number', {
    length: 255,
  }).notNull(),
  address: varchar('address', {
    length: 255,
  }).notNull(),
  checkoutPrice: integer('checkout_price').notNull(),
  note: text('note'),
  sentAt: timestamp('sent_at'),
}) 

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

export const insertOrderSchema = createInsertSchema(orders)

