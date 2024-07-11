export default function() {
  return useState<CustomerOrder>('order', () => {
    return {
      keyboardColor: null,
      switches: null,
      keycaps: null,
      handlubedSwitches: false,
      extraFoam: false,
      tapeMod: false,
      name: null,
      phoneNumber: null,
      address: null,
      note: null,
    }
  })
}
