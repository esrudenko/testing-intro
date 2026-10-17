function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным");
  }

  if (quantity > product.stock) {
    throw new RangeError("Вы добавляете больше товара, чем есть на складе");
  }

  const existingProduct = cart.find((c) => c.id === product.id);
  if (existingProduct) {
    quantity += existingProduct.quantity;
    if (quantity > product.stock) {
      throw new RangeError("Вы добавляете больше товара, чем есть на складе");
    } else {
      const updateCart = cart.map((c) => {
        if (c.id === product.id) {
          return {
            ...c,
            quantity: quantity,
          };
        }
        return c;
      });
      return updateCart;
    }
  } else {
    const updateCart = [...cart];
    updateCart.push({ ...product, quantity: quantity });
    return updateCart;
  }
}
function changeQuantity() {
  return notImplemented();
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
