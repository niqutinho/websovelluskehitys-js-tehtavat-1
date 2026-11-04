const requestUrl = 'https://reqres.in/api/users/1';

async function getUser() {
  try {
    const response = await fetch(requestUrl, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error('Could not fetch the user:', error);
  }
}

getUser();
