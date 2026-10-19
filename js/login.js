const userKalle = "Kalle";
const pwdKalle = "qwe123";

const userLoggedIn = localStorage.getItem("user");

// Refererar till inputen "user" i html-koden
let user;

// Refererar till inputen "pwd" i html-koden
let pwd;

// Refererar till p-taggen utanför formuläret där, senare, infomeddelanden skriv ut i
let info;

// Refererar till p-taggen inuti formuläret där, senare, infomeddelande skrivs ut i 
let infoForm;

// Refererar till formuläret där html-taggarna med id "user", "pwd" och "btn-log-in" ligger i
let form;

// Refererar till knappen med id "btn-log-out" i html-koden
let logOut;

// Refererar de globala variablerna till rätt html-taggar
// Lyssnar efter om någon av knapparna trycks och isåfall aktivera functionerna inuti måsvingarna.
// Om man klickar på logga ut knappen så döljs den dessutom så att den inte syns i utloggat läge
// Kontrollerar också om det finns tidigare Namn lagrade i localstorage och isåfall startar funktionen logInFunction
function init(){
    user = document.getElementById("user");
    pwd = document.getElementById("pwd");
    info = document.getElementById("info-log-in");
    infoForm = document.getElementById("info-log-in-form");

    const btnLogOut = document.getElementById("btn-log-out");
    logOut = btnLogOut;
    logOut.hidden = true;
    btnLogOut.addEventListener("click", e=>{
        e.preventDefault();
        logOutFunction();
    })

    const formLogIn = document.getElementById("inloggning-form");
    form = formLogIn;
    formLogIn.addEventListener("submit", e=>{
        e.preventDefault();
        logInCheck();
    })

    if(userLoggedIn === userKalle){
        user.value = userLoggedIn;

        logInFunction();
    }
}

// Aktiverar funktionen init
window.onload = init;

// Kontrollerar så att inloggningsuppgifterna stämmer
// Finns de registrerade så aktiveras funktionen LogInFunction
// Finns de inte registrerade så skickas en sträng till p-taggen för meddelande med texten "Felaktiga inloggningsuppgifter"
function logInCheck(){
    if(user.value === userKalle){
        if(pwd.value === pwdKalle){            
            return logInFunction();
        }
        else{
            infoForm.textContent = `Felaktiga inloggningsuppgifter`;

            return;
        }
    }
    else{
        infoForm.textContent = `Felaktiga inloggningsuppgifter`;

        return;
    }
}

// Döljer formuläret och synliggör logga ut-knappen
// Lagrar namnet i localStorage så att användaren senare inte behöver fylla i inloggningsuppgifter varje gång sidan uppdateras
// Skriver ut ett meddelande i p-taggen för meddelande
function logInFunction(){
    form.hidden = true;
    logOut.hidden = false;

    localStorage.setItem("user", user.value);

    info.textContent = `Välkommen ${user.value}, du är nu inloggad!`;

    return;
}

// Synliggör formuläret och döljer loffa ut-knappen
// Tar bort namnet ur localStorage så att användaren inte loggas in automatisk igen när sidan uppdateras
// Tömmer p-taggarna för meddelande och ersätter med en tom sträng
function logOutFunction(){
    form.hidden = false;
    logOut.hidden = true;

    localStorage.removeItem("user");

    info.textContent = "";
    infoForm.textContent = "";

    return;
}