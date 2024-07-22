import { type FormBody as ServerFormBody, type FormReturn as ServerFormReturn } from "@/server/utils/form"

export type FormBody = ServerFormBody

export type FormReturn = ServerFormReturn

type FormResult = {
  chosen: KeyboardBuild,
  response: FormReturn,
}

export function setFormResult(result: FormResult) {
  localStorage.setItem("form-result", JSON.stringify(result))
}

export function getFormResult(): FormResult | null {
  const raw = localStorage.getItem("form-result")
  if(!raw) {
    return null                 
  }

  return JSON.parse(raw) as FormResult
}

export function removeFormResult(): void {
  localStorage.removeItem("form-result") 
}
