import { insertOrderSchema, type Order as ServerOrder } from "@/server/db/schema";

export type Order = Omit<ServerOrder, "shippedAt">
export const orderSchema = insertOrderSchema.omit({ shippedAt: true })
