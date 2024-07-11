import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js"
import { z } from "zod"

 export const zPhone = z
   .string({
      message: "Obavezno!",
    })
   .refine(isValidPhoneNumber, "Molim Vas, upišite pravi broj telefona!")
   .transform((value) => parsePhoneNumber(value).number.toString());

