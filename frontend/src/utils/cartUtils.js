export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //Items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
            
    //? Shipping price : {if order is above 250 rupees then shipping is free, else shipping fee is 50 rupees}
    state.shippingPrice = addDecimals(state.itemsPrice > 250 ? 0 : 50)


    //? Tax price { 5% tax}
    state.taxPrice = addDecimals(Number((0.05 * state.itemsPrice).toFixed(2)))

    //Total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice) 
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state))

    return state;
} 