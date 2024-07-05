import { insertOrderSchema, type Order as ServerOrder } from "@/server/db/schema";

export type CustomerOrder = Partial<Omit<ServerOrder, "shippedAt" | "id" | "checkoutPrice">>
export type Order = Omit<ServerOrder, "id" | "shippedAt">

export const orderSchema = insertOrderSchema.omit({ checkoutPrice: true })
