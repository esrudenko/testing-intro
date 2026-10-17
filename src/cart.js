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

function changeQuantity(cart, productID, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным");
  }

  const existingProduct = cart.find((c) => c.id === productID);
  if (!existingProduct) {
    return cart;
  } else {
    if (quantity > existingProduct.stock) {
      throw new RangeError("Вы добавляете больше товара, чем есть на складе");
    } else {
      const updateCart = cart.map((c) => {
        if (c.id === productID) {
          return {
            ...c,
            quantity: quantity,
          };
        }
        return c;
      });
      return updateCart;
    }
  }
}

function removeFromCart(cart, productID) {
  const updateCart = cart.filter((c) => {
    return c.id !== productID;
  });
  return updateCart;
}

function calculateCartSubtotal(cart) {
    const total = cart.reduce((sum, item) => {
      sum += item.price * item.quantity;
      return sum;
    }, 0);
    return total;
  }

function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  let discount;
  let delivery;
  let total;

  (subtotal >= 50000) ? delivery = 0 : delivery = 30000;
  (subtotal >= 20000 && promo === 'SAVE10') ? discount = subtotal * 0.1 : discount = 0;
  total = subtotal + delivery - discount;

  return {subtotal: subtotal, discount: discount, delivery: delivery, total: total,};
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
