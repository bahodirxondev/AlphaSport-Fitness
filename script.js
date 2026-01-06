import { db } from "./firebase-init.js";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const form = document.getElementById("clientForm");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("clientsTableBody");

// Firestore collection
const clientsCol = collection(db, "clients");

// Real-time snapshot jadvalni yangilash
onSnapshot(query(clientsCol, orderBy("createdAt", "desc")), (snapshot) => {
  tableBody.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.gender}</td>
      <td>${data.subscription}</td>
      <td>${data.price}</td>
      <td>${new Date(data.startDate).toLocaleDateString()}</td>
      <td>${new Date(data.nextPayment).toLocaleDateString()}</td>
      <td>
        <button class="deleteBtn" data-id="${docSnap.id}">O'chirish</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Delete tugmasi
  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "clients", id));
    });
  });
});

// Qo‘shish tugmasi
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const name = form.name.value.trim();
  const gender = form.gender.value;
  const subscription = form.subscription.value;
  const price = form.price.value;
  const startDate = form.startDate.value;
  const nextPayment = form.nextPayment.value;

  // ✅ Form validation
  if (!name || !gender || !subscription || !price || !startDate || !nextPayment) {
    alert("Barcha maydonlarni to'ldiring!");
    return; // Shu yerda to‘xtaydi
  }

  // Qo‘shish
  await addDoc(clientsCol, {
    name,
    gender,
    subscription,
    price,
    startDate,
    nextPayment,
    createdAt: new Date()
  });

  // Form clear
  form.reset();
});

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const auth = getAuth(); // Firebase auth

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Siz muvaffaqiyatli chiqdingiz!");
    window.location.href = "index.html"; // Login sahifaga yo‘naltirish
  } catch (error) {
    console.error("Logout xato:", error);
    alert("Logout amalga oshmadi!");
  }
});
