export const formatCurrency = (number : number) => {
    console.log(number)
    console.log(typeof number)

    return "$" + new Intl.NumberFormat("es-ES", { style: "currency", currency: "MXN", currencyDisplay:'symbol' }).format(
    number,
  )
}