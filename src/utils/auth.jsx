export const BASE_URL = 'https://reqres.in/api';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json()
      .then((err) => {
        console.log(err);
      });
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
			'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
			"password": password,
      "email": email
		})
  })
  .then(checkResponse)
};