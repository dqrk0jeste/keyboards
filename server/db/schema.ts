import { pgTable, uuid, integer, varchar, text, index, json, boolean, primaryKey, pgEnum } from 'drizzle-orm/pg-core'

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', {
    length: 255,
  }).notNull(), 
  password: varchar('password', {
    length: 255,
  }).notNull(),
  email: varchar('email', {
    length: 255,
  }).notNull().unique(),
}, (table) => {
    return {
      emailIndex: index('email_index').on(table.email),
    }
})

export type Customer = typeof customers.$inferSelect
export type NewCustomer = typeof customers.$inferInsert

export const phoneNumbers = pgTable('phone_numbers', {
  id: uuid('id').primaryKey().defaultRandom(),
  phoneNumber: varchar('phone_number', {
    length: 255,
  }).notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
})

export type PhoneNumber = typeof phoneNumbers.$inferSelect
export type NewPhoneNumber = typeof phoneNumbers.$inferSelect

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  address: varchar('address', {
    length: 255,
  }).notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
})

export type Address = typeof addresses.$inferSelect
export type NewAddress = typeof addresses.$inferInsert

export const keyboardFormatOptions = pgEnum('keyboard_format_options', [
  '60%',
  '75%',
  'TKL',
  '100%',
])

export const keyboards = pgTable('keyboards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  isBluetooth: boolean('is_bluetooth').notNull().default(false),
  isWireless: boolean('is_wireless').notNull().default(false),
  format: keyboardFormatOptions('format').notNull(), 
  price: integer('price').notNull(),
  description: text('description'),
}, (table) => {
    return {
      nameIndex: index('name_index').on(table.name),
      priceIndex: index('keyboard_price_index').on(table.price),
    }
  }
);

export type Keyboard = typeof keyboards.$inferSelect 
export type NewKeyboard = typeof keyboards.$inferInsert

export const keyboardColors = pgTable('keyboard_colors', {
  color: varchar('color', {
    length: 255,
  }).notNull(),
  rgbValue: varchar('rgb_value', {
    length: 255,
  }).notNull(),
  keyboardId: uuid('keyboard_id').references(() => keyboards.id).notNull(),
  stock: integer('stock').notNull().default(0),
}, (table) => {
    return {
      pk: primaryKey({
        columns: [table.color, table.keyboardId],
      }),
    }
  })

export type KeyboardColor = typeof keyboardColors.$inferSelect 
export type NewKeyboardColor = typeof keyboardColors.$inferInsert

export const switches = pgTable('switches', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull().default(0),
  description: text('description'),
}, (table) => {
  return {
    priceIndex: index('switches_price_index').on(table.price),
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
  stock: integer('stock').notNull().default(0),
  description: text('description'),
}, (table) => {
  return {
    priceIndex: index('keycaps_price_index').on(table.price),
  }
})

export type Keycap = typeof keycaps.$inferSelect
export type NewKeycap = typeof keycaps.$inferInsert

  // these will be basic json format for custom keyboards
  //
  // keyboardId: uuid('keyboard_id').references(() => keyboards.id).notNull(),
  // switchId: uuid('switch_id').references(() => switches.id).notNull(),
  // keycapId: uuid('keycap_id').references(() => keycaps.id).notNull(),
  // handlubedSwitches: boolean('handlubed_switches').notNull().default(false),
  // keycapFormat: keycapFormatOptions('keycap_options').notNull().default('windows'),
  // extraFoam: boolean('extra_foam').notNull().default(false),
  //

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  cart: json('cart').notNull(),
  customerId: uuid('customer_id'), 
  addressId: uuid('address_id').references(() => addresses.id).notNull(),
  phoneNumberId: uuid('phone_number_id').references(() => phoneNumbers.id).notNull(),
}, (table) => {
  return {
     customerIndex: index('customer_index').on(table.customerId), 
    }
}) 

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

