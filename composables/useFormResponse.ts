export default function() {
  return useState<FormReturn | null>("form-response", () => null)
}
