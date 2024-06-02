
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/order/'+order.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}

export function fetchAllOrders(pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/order?' + queryString);
    const totalOrders = await response.headers.get("X-Total-Count");
    const data = await response.json();
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  }
  );
}
