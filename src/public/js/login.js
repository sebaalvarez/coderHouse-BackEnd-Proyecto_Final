const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // console.log(data);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  // console.log(obj);
  fetch("/api/jwt/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    // .then((result) => {
    //   if (result.status === 200) {
    //     console.log(obj);
    //     window.location.replace("/users/profile");
    //   }
    // });
    // });
    // })
    .then((result) => {
      if (result.status === 200) {
        result.json().then((json) => {
          // console.log(json);
          // localStorage.setItem("authToken", json.jwt);
          // console.log("Cookies generadas:");
          // console.log(document.cookie);
          alert("Login realizado con exito!");
          window.location.replace("/users/profile");
        });
      } else if (result.status === 401) {
        console.log(result);
        alert("Login invalido revisa tus credenciales!");
      }
    });
});
