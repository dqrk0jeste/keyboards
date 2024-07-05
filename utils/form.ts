import { bodySchema, type FormBody as ServerFormBody, type FormReturn as ServerFormReturn } from "@/server/utils/form"

export const orderFormSchema = bodySchema.partial()

export type FormBody = ServerFormBody

export type FormReturn = ServerFormReturn
