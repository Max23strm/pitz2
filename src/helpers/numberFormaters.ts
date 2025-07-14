export const formatCurrency = (number : number) => {

    return "$" + new Intl.NumberFormat("es-ES", { style: "currency", currency: "MXN", currencyDisplay:'symbol' }).format(
    number,
  )
}