import { db } from "./firebase-init.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const form = document.getElementById("clientForm");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("clientsTableBody");
const logoutBtn = document.getElementById("logoutBtn");

const clientsCol = collection(db, "clients");

const prices = {
  Erkak: {
    Kunlik: 20000,
    "Kun ora": 250000,
    Oylik: 300000,
    "3 oylik": 700000,
    "6 oylik": 1300000,
    "1 yillik": 2400000,
  },
  Ayol: {
    Kunlik: 20000,
    "Kun ora": 200000,
    Oylik: 250000,
    "3 oylik": 500000,
    "6 oylik": 1000000,
    "1 yillik": 1800000,
  },
};

// Real-time jadval
onSnapshot(query(clientsCol, orderBy("createdAt", "desc")), (snapshot) => {
  tableBody.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.phone}</td>
      <td>${data.subscription}</td>
      <td>${data.price.toLocaleString()} so'm</td>
      <td>${new Date(data.startDate).toLocaleDateString()}</td>
      <td>${new Date(data.nextPayment).toLocaleDateString()}</td>
      <td><button class="deleteBtn" data-id="${
        docSnap.id
      }">O'chirish</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "clients", id));
    });
  });
});

// Qo‘shish
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const gender = form.gender.value;
  const subscription = form.subscription.value;

  if (!name || !phone || !gender || !subscription) {
    alert("Barcha maydonlarni to'ldiring!");
    return;
  }

  const price = prices[gender][subscription];
  const today = new Date();
  let nextPayment = new Date(today);

  switch (subscription) {
    case "Kunlik":
      nextPayment.setDate(nextPayment.getDate() + 1);
      break;
    case "Kun ora":
    case "Oylik":
      nextPayment.setMonth(nextPayment.getMonth() + 1);
      break;
    case "3 oylik":
      nextPayment.setMonth(nextPayment.getMonth() + 3);
      break;
    case "6 oylik":
      nextPayment.setMonth(nextPayment.getMonth() + 6);
      break;
    case "1 yillik":
      nextPayment.setFullYear(nextPayment.getFullYear() + 1);
      break;
  }

  try {
    await addDoc(clientsCol, {
      name,
      phone,
      gender, // saqlaymiz, ammo jadvalda ko‘rsatilmaydi
      subscription,
      price,
      startDate: today.toISOString(),
      nextPayment: nextPayment.toISOString(),
      createdAt: new Date(),
    });
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Xatolik yuz berdi!");
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
