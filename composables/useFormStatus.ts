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
  return ref<T>({
    hasCompletedForm: false,
    response: null,
    body: null,
  })
}
