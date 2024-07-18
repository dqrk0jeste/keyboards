type T = {
  hasCompletedForm: true,
  response: FormReturn,
  body: FormBody,
  chosen: KeyboardBuild,
} | {
  hasCompletedForm: false,
  response: null,
  body: null,
  chosen: null,
}

export default function() {
  return useState<T>('form-status', () => {
    return {
      hasCompletedForm: false,
      response: null,
      body: null,
      chosen: null,
    }
  })
}
