// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:5001/api/counter');
    const data = await response.json();
    resolve({ data});
  }
  );
}
