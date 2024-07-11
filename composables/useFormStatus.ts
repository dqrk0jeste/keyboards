type T = {
  hasCompletedForm: true,
  response: FormReturn,
  body: FormBody,
} | {
  hasCompletedForm: false,
  response: null,
  body: null,
}

export default function() {
  return useState<T>('form-status', () => {
    return {
      hasCompletedForm: false,
      response: null,
      body: null,
    }
  })
}
