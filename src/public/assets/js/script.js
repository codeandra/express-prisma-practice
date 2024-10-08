document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "https://express-prisma-practice.vercel.app/"; // deploy url
//   const baseUrl = "http://localhost:2000"; 
  fetch(`${baseUrl}/list-api?name=users`)
    .then((response) => response.json())
    .then((apiList) => {
      const contentUsers = document.getElementById("content-users");

      apiList.forEach((api) => {
        contentUsers.innerHTML += `
        <div class="item">
            <p>${api.method}</p>
            <a href="${api.url}">${api.url}</a>
        </div>
        `
      })
    });

  fetch(`${baseUrl}/list-api?name=products`)
    .then((response) => response.json())
    .then((apiList) => {
        const contentUsers = document.getElementById("content-products");
  
        apiList.forEach((api) => {
          contentUsers.innerHTML += `
          <div class="item">
              <p>${api.method}</p>
              <a href="${api.url}">${api.url}</a>
          </div>
          `
        })
    });

    fetch(`${baseUrl}/list-api?name=orders`)
    .then((response) => response.json())
    .then((apiList) => {
        const contentUsers = document.getElementById("content-orders");
  
        apiList.forEach((api) => {
          contentUsers.innerHTML += `
          <div class="item">
              <p>${api.method}</p>
              <a href="${api.url}">${api.url}</a>
          </div>
          `
        })
    });
});
