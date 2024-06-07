
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
    const response = await fetch('http://localhost:8080/order/' + order.id, {
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
  let queryString = "_page=1&_limit=20";
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/order?' + queryString);
    const totalOrders = response.headers.get("X-Total-Count");
    const data = await response.json();
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  }
  );
}
