const userKalle = "Kalle";
const pwdKalle = "qwe123";

const userLoggedIn = localStorage.getItem("user");

// Refererar till inputen "user" i html-koden
let user;

// Refererar till inputen "pwd" i html-koden
let pwd;

// Refererar till p-taggen inuti formuläret där, senare, infomeddelande skrivs ut i 
let infoForm;

// Refererar till formuläret där html-taggarna med id "user", "pwd" och "btn-log-in" ligger i
let form;

let logInDiv;

// Refererar de globala variablerna till rätt html-taggar
// Lyssnar efter om någon av knapparna trycks och isåfall aktivera functionerna inuti måsvingarna.
// Om man klickar på logga ut knappen så döljs den dessutom så att den inte syns i utloggat läge
// Kontrollerar också om det finns tidigare Namn lagrade i localstorage och isåfall startar funktionen logInFunction
function initLogIn(){
    user = document.getElementById("user");
    pwd = document.getElementById("pwd");
    infoForm = document.getElementById("info-log-in-form");

    logInDiv = document.getElementById("inloggning");

    form = document.getElementById("inloggning-form");
    form.addEventListener("submit", e=>{
        e.preventDefault();
        logInCheck();
    })

    const btnLogOut = document.getElementById("btn-log-out");
    btnLogOut.addEventListener("click", e=>{
        e.preventDefault();
        logOutFunction();
    })

    if(userLoggedIn === userKalle){
        user.value = userLoggedIn;

        logInFunction();
    }
}

// Kontrollerar så att inloggningsuppgifterna stämmer
// Finns de registrerade så aktiveras funktionen LogInFunction
// Finns de inte registrerade så skickas en sträng till p-taggen för meddelande med texten "Felaktiga inloggningsuppgifter"
function logInCheck(){
    if(user.value === userKalle && pwd.value === pwdKalle){        
        return logInFunction();
    }
    else{
        infoForm.textContent = `Felaktiga inloggningsuppgifter`;
        
        form.reset();

        return;
    }
}

// Döljer formuläret och synliggör logga ut-knappen
// Lagrar namnet i localStorage så att användaren senare inte behöver fylla i inloggningsuppgifter varje gång sidan uppdateras
// Skriver ut ett meddelande i p-taggen för meddelande
function logInFunction(){
    const hidden = document.querySelectorAll(".hidden");
    hidden.forEach(e => {
        e.classList.remove("hidden");
    })
    logInDiv.classList.add("hidden");

    localStorage.setItem("user", user.value);

    return;
}

function logOutFunction(){
    logInDiv.classList.remove("hidden");

    document.querySelector("header").classList.add("hidden");
    document.querySelector(".svamp-lista").parentElement.classList.add("hidden");

    localStorage.removeItem("user");

    infoForm.textContent = "";

    form.reset();

    return;
}

window.addEventListener("load", initLogIn);