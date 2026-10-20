const userLoggedIn = localStorage.getItem("user");
const logInOutBtn = document.getElementById("log-in-log-out-btn")

if(userLoggedIn === "Kalle"){
    logInOutBtn.textContent = "Logga ut";
    logInOutBtn.href = "index.html";
}

logInOutBtn.addEventListener("click", e =>{
    localStorage.removeItem("user");
})