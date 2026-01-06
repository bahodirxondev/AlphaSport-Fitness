document.addEventListener("DOMContentLoaded", () => {

  const prices = {
    Erkak: {
      "Kunlik":20000,"Kun ora (oylik)":250000,"Oylik":300000,
      "3 oylik":700000,"6 oylik":1300000,"1 yillik":2400000
    },
    Ayol: {
      "Kunlik":20000,"Kun ora (oylik)":200000,"Oylik":250000,
      "3 oylik":500000,"6 oylik":1000000,"1 yillik":1800000
    }
  };

  const addBtn = document.getElementById("addBtn");
  const tableBody = document.getElementById("tableBody");

  let clients = JSON.parse(localStorage.getItem("clients")) || [];

  function render() {
    tableBody.innerHTML = "";
    clients.forEach((c,i)=>{
      tableBody.innerHTML += `
        <tr>
          <td>${i+1}</td>
          <td>${c.name}</td>
          <td>${c.phone}</td>
          <td>${c.membership}</td>
          <td>${c.price.toLocaleString()} so‘m</td>
          <td><button onclick="del(${i})">O‘chirish</button></td>
        </tr>`;
    });
  }

  addBtn.addEventListener("click", () => {
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const gender = document.getElementById("gender");
    const membership = document.getElementById("membership");

    if(!name.value || !phone.value || !gender.value || !membership.value){
      alert("Barcha maydonlarni to‘ldiring");
      return;
    }

    const price = prices[gender.value][membership.value];

    clients.push({
      name: name.value,
      phone: phone.value,
      membership: membership.value,
      price
    });

    localStorage.setItem("clients", JSON.stringify(clients));
    render();

    /* 🔥 FORM CLEAR */
    name.value = "";
    phone.value = "";
    gender.value = "";
    membership.value = "";
  });

  window.del = (i) => {
    clients.splice(i,1);
    localStorage.setItem("clients", JSON.stringify(clients));
    render();
  };

  document.getElementById("logoutBtn").onclick = () => {
    window.location.href = "index.html";
  };

  render();
});
