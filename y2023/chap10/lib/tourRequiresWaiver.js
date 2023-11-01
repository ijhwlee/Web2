module.exports = (req, res, next) => {
    const { cart } = req.session
    if (!cart) return next()
    if (cart.items.some(item => itemm.product.requiresWaiver)) {
        cart.warnings.push('One of more of your selected tours requires a waiver.')
    }
    next()
}