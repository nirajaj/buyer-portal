const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/";
}

const userName = document.getElementById("userName");
const profileName = document.getElementById("profileName");
const userRole = document.getElementById("userRole");
const userEmail = document.getElementById("userEmail");
const totalProperties = document.getElementById("totalProperties");
const totalFavourites = document.getElementById("totalFavourites");
const sidebarUserRole = document.getElementById("sidebarUserRole");
const propertiesList = document.getElementById("propertiesList");
const favouritesList = document.getElementById("favouritesList");
const globalMessage = document.getElementById("globalMessage");
const logoutBtn = document.getElementById("logoutBtn");

function showMessage(text, type) {
  globalMessage.textContent = text;
  globalMessage.className = `message ${type}`;

  setTimeout(() => {
    globalMessage.className = "message";
    globalMessage.textContent = "";
  }, 3000);
}

async function fetchMe() {
  const response = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

async function fetchProperties() {
  const response = await fetch("/api/properties", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to fetch properties");
  return response.json();
}

async function fetchFavourites() {
  const response = await fetch("/api/favourites", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to fetch favourites");
  return response.json();
}

async function addFavourite(propertyId) {
  const response = await fetch("/api/favourites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ propertyId })
  });

  const data = await response.json();

  if (!response.ok) {
    showMessage(data.message || "Failed to add favourite.", "error");
    return;
  }

  showMessage(data.message || "Added to favourites.", "success");
  await loadDashboard();
}

async function removeFavourite(propertyId) {
  const response = await fetch(`/api/favourites/${propertyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    showMessage(data.message || "Failed to remove favourite.", "error");
    return;
  }

  showMessage(data.message || "Removed from favourites.", "success");
  await loadDashboard();
}

function getPropertyImage(index) {
  const images = [
    "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(6,182,212,0.25)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80')",
    "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(14,165,233,0.25)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80')",
    "linear-gradient(135deg, rgba(249,115,22,0.30), rgba(239,68,68,0.25)), url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80')",
    "linear-gradient(135deg, rgba(34,197,94,0.28), rgba(6,182,212,0.22)), url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80')"
  ];

  return images[index % images.length];
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "U";
}

function createPropertyCard(property, index, isFavourite = false, removeOnly = false) {
  const card = document.createElement("div");
  card.className = "property-card";

  card.innerHTML = `
    <div class="property-image" style="background: ${getPropertyImage(index)}; background-size: cover; background-position: center;"></div>

    <div class="property-top">
      <h3>${property.title}</h3>
      <span class="price-tag">${property.price}</span>
    </div>

    <div class="property-meta">
      <span class="meta-pill">📍 ${property.location}</span>
      <span class="meta-pill">${isFavourite ? "❤️ Saved" : "🏠 Available"}</span>
    </div>

    <p>${property.description}</p>

    <div class="card-actions">
      ${
        removeOnly
          ? `<button class="btn-remove">Remove</button>`
          : isFavourite
          ? `<button class="btn-remove">Remove from Favourites</button>`
          : `<button class="btn-add">Add to Favourites</button>`
      }
    </div>
  `;

  const button = card.querySelector("button");

  button.addEventListener("click", () => {
    if (isFavourite || removeOnly) {
      removeFavourite(property.id);
    } else {
      addFavourite(property.id);
    }
  });

  return card;
}

function renderProperties(properties, favourites) {
  propertiesList.innerHTML = "";

  if (!properties.length) {
    propertiesList.innerHTML = `<div class="empty-state">No properties available at the moment.</div>`;
    return;
  }

  const favouriteIds = favourites.map((fav) => fav.id);

  properties.forEach((property, index) => {
    const isFavourite = favouriteIds.includes(property.id);
    propertiesList.appendChild(createPropertyCard(property, index, isFavourite, false));
  });
}

function renderFavourites(favourites) {
  favouritesList.innerHTML = "";

  if (!favourites.length) {
    favouritesList.innerHTML = `
      <div class="empty-state">
        You have not added any favourites yet.
        <br />
        <span class="small-note">Save a property from the listings section to see it here.</span>
      </div>
    `;
    return;
  }

  favourites.forEach((property, index) => {
    favouritesList.appendChild(createPropertyCard(property, index, true, true));
  });
}

async function loadDashboard() {
  try {
    const [user, properties, favourites] = await Promise.all([
      fetchMe(),
      fetchProperties(),
      fetchFavourites()
    ]);

    userName.textContent = user.name;
    profileName.textContent = user.name;
    userEmail.textContent = user.email;
    userRole.textContent = user.role;
    sidebarUserRole.textContent = user.role;
    totalProperties.textContent = properties.length;
    totalFavourites.textContent = favourites.length;

    const avatarCircle = document.querySelector(".avatar-circle");
    if (avatarCircle) {
      avatarCircle.textContent = getInitial(user.name);
    }

    renderProperties(properties, favourites);
    renderFavourites(favourites);
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
});

loadDashboard();