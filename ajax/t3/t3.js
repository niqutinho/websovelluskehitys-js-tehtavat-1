const requestUrl = 'https://reqres.in/api/unknown/23';

async function fetchMissingResource() {
  try {
    const response = await fetch(requestUrl, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const resource = await response.json();
    console.log(resource);
  } catch (error) {
    console.error('Could not fetch the resource:', error.message);
  }
}

fetchMissingResource();
