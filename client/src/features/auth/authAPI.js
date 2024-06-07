// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      if(response.ok){
        const data = await response.json();
        const headers = response.headers;
        resolve({ data });
      }else{
        const error = await response.json();
        reject({error});
      } 
    }catch(error) {
      reject(error);
    }
  }
  );
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'success' });
  }
  );
}