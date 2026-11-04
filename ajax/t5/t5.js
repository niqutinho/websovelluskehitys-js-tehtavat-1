const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const restaurantList = document.querySelector('#restaurant-list');
const restaurantStatus = document.querySelector('#restaurant-status');
const restaurantDialog = document.querySelector('dialog');
const restaurantTitle = document.querySelector('#restaurant-title');
const restaurantDetails = document.querySelector('#restaurant-details');
const menuStatus = document.querySelector('#menu-status');
const menuList = document.querySelector('#menu-list');
let menuRequestId = 0;

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function addDetail(label, value) {
  const term = document.createElement('dt');
  const description = document.createElement('dd');
  term.textContent = label;
  description.textContent = value || 'Not available';
  restaurantDetails.append(term, description);
}

function showRestaurantDetails(restaurant) {
  restaurantTitle.textContent = restaurant.name || 'Restaurant';
  restaurantDetails.replaceChildren();
  addDetail('Address', restaurant.address);
  addDetail('Postal code', restaurant.postalCode);
  addDetail('City', restaurant.city);
  addDetail('Phone', restaurant.phone);
  addDetail('Company', restaurant.company);
}

function renderMenu(menu) {
  const courses = Array.isArray(menu) ? menu : menu.courses;

  if (!Array.isArray(courses)) {
    throw new Error('The menu response has an unexpected format.');
  }

  if (courses.length === 0) {
    menuStatus.textContent = 'No menu is available for today.';
    return;
  }

  menuStatus.textContent = '';
  courses.forEach(course => {
    const item = document.createElement('li');
    const name = document.createElement('h4');
    name.textContent = course.name || 'Menu item';
    item.className = 'menu-item';
    item.append(name);

    if (course.price) {
      const price = document.createElement('p');
      price.textContent = `Price: ${course.price}`;
      item.append(price);
    }

    if (course.diets) {
      const diets = document.createElement('p');
      diets.textContent = `Diets: ${course.diets}`;
      item.append(diets);
    }

    menuList.append(item);
  });
}

async function showRestaurant(restaurant) {
  const requestId = ++menuRequestId;
  showRestaurantDetails(restaurant);
  menuStatus.textContent = 'Loading today’s menu…';
  menuList.replaceChildren();

  if (!restaurantDialog.open) {
    restaurantDialog.showModal();
  }

  try {
    const menu = await fetchJson(
      `${apiUrl}/restaurants/daily/${encodeURIComponent(restaurant._id)}/en`
    );

    if (requestId === menuRequestId) {
      renderMenu(menu);
    }
  } catch (error) {
    if (requestId === menuRequestId) {
      menuStatus.textContent =
        'The menu could not be loaded. Check your connection to the Metropolia network or VPN and try again.';
      console.error('Could not fetch the restaurant menu:', error);
    }
  }
}

function renderRestaurants(restaurants) {
  restaurants
    .slice()
    .sort((first, second) =>
      (first.name || '').localeCompare(second.name || '', 'fi', {
        sensitivity: 'base',
      })
    )
    .forEach(restaurant => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const addressCell = document.createElement('td');
      const cityCell = document.createElement('td');
      const nameButton = document.createElement('button');

      nameButton.type = 'button';
      nameButton.className = 'restaurant-name';
      nameButton.textContent = restaurant.name || 'Unnamed restaurant';
      nameButton.addEventListener('click', () => showRestaurant(restaurant));
      nameCell.append(nameButton);
      addressCell.textContent = restaurant.address || 'Not available';
      cityCell.textContent = restaurant.city || 'Not available';
      row.append(nameCell, addressCell, cityCell);
      restaurantList.append(row);
    });
}

async function loadRestaurants() {
  try {
    const restaurants = await fetchJson(`${apiUrl}/restaurants`);

    if (!Array.isArray(restaurants)) {
      throw new Error('The restaurant response has an unexpected format.');
    }

    renderRestaurants(restaurants);
    restaurantStatus.textContent = `${restaurants.length} restaurants loaded.`;
  } catch (error) {
    restaurantStatus.textContent =
      'Restaurants could not be loaded. Check your connection to the Metropolia network or VPN and reload the page.';
    console.error('Could not fetch restaurants:', error);
  }
}

loadRestaurants();
