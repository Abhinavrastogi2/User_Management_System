let users = [];
let editIndex = -1;

function renderUsers() {
  const list = document.getElementById('userList');
  list.innerHTML = "";

  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${index + 1}. ${user.name} - ${user.email}
      <button class="action-btn edit-btn" onclick="editUser(${index})">Edit</button>
      <button class="action-btn delete-btn" onclick="deleteUser(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function addOrUpdateUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Both fields are required!");
    return;
  }

  if (editIndex === -1) {
    users.push({ name, email });
  } else {
    users[editIndex] = { name, email };
    editIndex = -1;
    document.getElementById("submitBtnText").innerText = "Add User";
  }

  renderUsers();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

function editUser(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("submitBtnText").innerText = "Update User";
  editIndex = index;
}

async function fetchRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const user = data.results[0];
    const fullName = `${user.name.first} ${user.name.last}`;
    const email = user.email;

    users.push({ name: fullName, email });
    renderUsers();
  } catch (error) {
    alert("Error fetching user");
    console.error(error);
  }
}
