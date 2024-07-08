export function throwError(status: 404 | 500) {
  if(status === 404) {
    throw createError({
      status: 404,
      message: "Ova stranica ne postoji",
      fatal: true,
    })
  } else {
    throw createError({
      status: 500,
      message: "Došlo je do greške na našoj strani. Izvinjavamo se!",
      fatal: true,
    })
  }
}
