const userLoggedIn = localStorage.getItem("user");

if(userLoggedIn !== "Kalle"){
    window.location.href = "index.html";
}