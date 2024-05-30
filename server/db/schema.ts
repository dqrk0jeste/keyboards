import { pgTable, uuid, integer, varchar, text, index, boolean, pgEnum } from 'drizzle-orm/pg-core'

export const keyboards = pgTable('keyboards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  price: integer('price').notNull(),
  description: text('description'),
}, (table) => {
    return {
      nameIndex: index('name_index').on(table.name),
      priceIndex: index('price_index').on(table.price),
    }
  }
);

export type Keyboard = typeof keyboards.$inferSelect 
export type NewKeyboard = typeof keyboards.$inferInsert

export const switches = pgTable('switches', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  price: integer('price').notNull(),
  description: text('description'),
}, (table) => {
  return {
    priceIndex: index('price_index').on(table.price),
  }
})

export type Switch = typeof switches.$inferSelect
export type NewSwitch = typeof switches.$inferInsert

export const keycaps = pgTable('keycaps', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  price: integer('price').notNull(),
  description: text('description'),
}, (table) => {
  return {
    priceIndex: index('price_index').on(table.price),
  }
})

export type Keycaps = typeof keycaps.$inferSelect
export type NewKeycaps = typeof keycaps.$inferInsert

export const keycapFormatOptions = pgEnum('keycap_options', [
  'windows',
  'mac',
])

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  keyboardId: uuid('keyboard_id').references(() => keyboards.id).notNull(),
  switchId: uuid('switch_id').references(() => switches.id).notNull(),
  keycapId: uuid('keycap_id').references(() => keycaps.id).notNull(),
  handlubedSwitches: boolean('handlubed_switches').notNull().default(false),
  keycapFormat: keycapFormatOptions('keycap_options').notNull().default('windows'),
  extraFoam: boolean('extra_foam').notNull().default(false),
  customerName: varchar('customer_name', {
    length: 255,
  }).notNull(),
  address: varchar('address', {
    length: 255,
  }).notNull(),
  phoneNumber: varchar('address', {
    length: 255,
  }).notNull(),
  note: varchar('note', {
    length: 255,
  }).notNull(),
}, (table) => {
  return {
      
    }
}) 

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
