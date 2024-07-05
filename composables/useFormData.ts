export default function() {
  return useLocalStorage("form", {} as {
    response: FormReturn,
    body: FormBody,    
  })
}
