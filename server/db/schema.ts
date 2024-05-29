import { pgTable, uuid, integer, varchar, text, index } from 'drizzle-orm/pg-core';

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
    }
  }
);

export type User = typeof keyboards.$inferSelect; 
export type NewUser = typeof keyboards.$inferInsert;
