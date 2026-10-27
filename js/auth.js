const userLoggedIn = localStorage.getItem("user");
const logInOutBtn = document.getElementById("log-in-log-out-btn")
//Kollar om användaren är inloggad och isåfall ändra texten på logInLogOutBtn till "Logga ut", länkar om knappen till index.html
//samt tar bort alla hidden klasser och lägger till hidden på ID "log-in-message".
if(userLoggedIn === "Kalle"){
    logInOutBtn.textContent = "Logga ut";
    logInOutBtn.href = "index.html";

    const hidden = document.querySelectorAll(".hidden");
    hidden.forEach(e =>{
        e.classList.remove("hidden");
    })

    const logInMessage = document.getElementById("log-in-message");
    if(logInMessage !== null){
        logInMessage.classList.add("hidden");
    }
}
//Skapar en eventlistener som lyssnar på logga ut-knappen och sedan tar bort användarnamnet ur localstorage
logInOutBtn.addEventListener("click", e =>{
    localStorage.removeItem("user");
})