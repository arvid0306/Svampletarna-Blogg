"use strict";
//Sparar en array i en konstant bestående av de sparade blogginläggen i localstorage
const blogPostHistory = JSON.parse(localStorage.getItem("blogPosts") || "[]");
//Sparar det sparade användarnamnet i localstorage till en konstant
const userLoggedInBlog = localStorage.getItem("user");
//Funktionen kontrollerar om det finns tidigare sparade blogginlägg och isåfall skapar dem.
//Dessutom skapar den en eventlistener på blogginläggsformuläret ifall användaren finns med i localstorage (dvs är inloggad)
//Eventlistener lyssnar efter om formuläret för blogginlägg skickas och isåfall sparar den de olika inputvärdena från formuläret till olika variabler
//Det görs även en check på att alla fält är ifyllda eftersom required i HTML även kan släppa igenom mellanslag eller tomma rader
//En objekt skapas också som innehåller all info som ska finnas i blogginlägget och sedan uppdateras arrayen för blogghistorik och funktionen createBlogPost anropas med konstanten för det nya blogginlägget
function initBlog() {
    if (blogPostHistory.length > 0) {
        blogPostHistory.forEach(blogPost => {
            createBlogPost(blogPost);
        });
    }
    if (userLoggedInBlog !== "" && userLoggedInBlog !== null) {
        const formBlogPosts = document.getElementById("blog-form");
        formBlogPosts?.addEventListener("submit", e => {
            e.preventDefault();
            const titel = document.getElementById("post-caption").value;
            const content = document.getElementById("post-content").value;
            const now = new Date();
            const date = now.toLocaleDateString("sv-SE");
            const id = crypto.randomUUID();
            if (titel.trim() === "" || content.trim() === "") {
                alert("Lämna inga tomma textfält");
                return;
            }
            const newBlogPost = {
                titel: titel,
                content: content,
                user: userLoggedInBlog,
                date: date,
                comments: [],
                id: id
            };
            blogPostHistory.push(newBlogPost);
            localStorage.setItem("blogPosts", JSON.stringify(blogPostHistory));
            createBlogPost(newBlogPost);
        });
    }
}
//Funktionen skapar ett nytt blogginlägg genom att skapa en kopia av mallen i HTML, ta bort "mall-id" och klassen som döljer mallen, och sedan fylla i med informationen som funktionen har anropats med. Efter det töms blogginläggsformuläret så att användaren lätt kan skriva ett nytt inlägg.
//Sedan kopplas formuläret för kommentar till en konstant och även inputen textarea till en annan konstant. Dessa görs en kontroll på så att de inte ger tillbaka null och isåfall så avbryts resten av funktionen.
//Efter det kopplas kommentarsmallen till en konstant och en annan konstant kopplas till listan där kommentarerna kommer hamna. Även dessa kontrolleras så de inte ger tillbaka null.
//Därefter gör en forEach-loop där funktionen createBlogComment anropas för varje kommentar som finns sparat i arrayen för blogkommentarer. Anropet skickas med informationen om det aktuella sparade kommentaren i just det varvet av loopen samt mallen för kommentarer och listan för där kommentaren ska hamna.
//Sedan kontrolleras så att användaren sparad i localstorage inte är lika med null för isåfall så avbryts resten av funktionen.
//Till sist så skapas en eventlistener för kommentarsformuläret som lyssnar efter när formuläret skickas.
//I den så sparas alla värden som behövs i den nya kommentaren och kontrollen för tomt textfält kontrolleras.
//Därefter skapas ett objekt innehållande all info till kommentaren, sedan läggs kommentaren till i arrayen för comments och sparar om hela blogPostHistory i localstorage och till slut anropas funktionen createBlogComment med objektet för kommentaren, listan för kommentarer och mallen för kommentaren.
function createBlogPost(blogPost) {
    const postList = document.getElementById("post-ul");
    const template = document.getElementById("post-template");
    if (postList === null || template === null) {
        return;
    }
    const templateContent = template.content.firstElementChild;
    if (templateContent === null) {
        return;
    }
    const blogEl = templateContent.cloneNode(true);
    const publishCommentElement = blogEl.querySelector(".blog-post-publish-comment");
    if (userLoggedInBlog !== null) {
        publishCommentElement?.classList.remove("hidden");
    }
    let children = blogEl.children[0].children[0].children;
    children[0].textContent = blogPost.titel;
    children[1].textContent = blogPost.content;
    children[2].textContent = blogPost.user;
    children[3].textContent = blogPost.date;
    blogEl.dataset.id = blogPost.id;
    document.getElementById("blog-form").reset();
    postList.prepend(blogEl);
    const formBlogComments = blogEl.querySelector(".comment-form");
    if (formBlogComments === null) {
        return;
    }
    const commentInput = formBlogComments.querySelector(".post-comment");
    if (commentInput === null) {
        return;
    }
    const commentList = blogEl.querySelector(".comment-ul");
    const commentTemplate = blogEl.querySelector(".comment-template");
    if (commentList === null || commentTemplate === null) {
        return;
    }
    const commentTemplateContent = (commentTemplate.content.firstElementChild);
    if (commentTemplateContent === null) {
        return;
    }
    blogPost.comments.forEach(blogComment => {
        createBlogComment(blogComment, commentList, commentTemplateContent);
    });
    if (userLoggedInBlog === null) {
        return;
    }
    formBlogComments.addEventListener("submit", e => {
        e.preventDefault();
        const content = commentInput.value;
        const now = new Date();
        const date = now.toLocaleDateString("sv-SE");
        if (content.trim() === "") {
            alert("Fyll i en kommentar för att publicera");
            return;
        }
        const newBlogComment = {
            comment: content,
            user: userLoggedInBlog,
            date: date
        };
        blogPost.comments.push(newBlogComment);
        localStorage.setItem("blogPosts", JSON.stringify(blogPostHistory));
        formBlogComments.reset();
        createBlogComment(newBlogComment, commentList, commentTemplateContent);
    });
}
//Funktionen createBlogComment skapar en kommentar genom att först göra en kopia av mallen för kommentarer, 
//sedan tas klasserna bort som följde med från mallen. Därefter fylls kopian med informationen som funktionen anropades med
//och till sist så läggs det nya li-elementet (kommentaren) till längst upp i listan för kommentarer på just det aktuella inlägget.
function createBlogComment(blogComment, commentList, commentTemplateEl) {
    const commentEl = commentTemplateEl.cloneNode(true);
    let children = commentEl.children[0].children[0].children;
    children[0].textContent = blogComment.comment;
    children[1].textContent = blogComment.user;
    children[2].textContent = blogComment.date;
    commentList.prepend(commentEl);
}
window.onload = initBlog;
