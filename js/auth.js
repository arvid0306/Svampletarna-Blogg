const userLoggedIn = localStorage.getItem("user");
const logInOutBtn = document.getElementById("log-in-log-out-btn")

if(userLoggedIn === "Kalle"){
    logInOutBtn.textContent = "Logga ut";
    logInOutBtn.href = "index.html";

    const hidden = document.querySelectorAll(".hidden");
    hidden.forEach(e =>{
        e.classList.remove("hidden");
    })
}

logInOutBtn.addEventListener("click", e =>{
    localStorage.removeItem("user");
})