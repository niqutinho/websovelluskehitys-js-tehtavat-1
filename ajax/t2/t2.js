const requestUrl = 'https://reqres.in/api/users';
const newUser = {
  name: 'John Doe',
  job: 'Developer',
};

async function createUser() {
  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error('Could not create the user:', error);
  }
}

createUser();
