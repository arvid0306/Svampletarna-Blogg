//Skapar en typ för bloggkommentarer
type BlogComment ={
    comment: string;
    user: string;
    date: string;
}
//Skapar en typ för blogginlägg
type BlogPost = {
    titel: string;
    content: string;
    user: string;
    date: string;
    comments: BlogComment[];
}
//Sparar en array i en konstant bestående av de sparade blogginläggen i localstorage
const blogPostHistory: BlogPost[] = JSON.parse(localStorage.getItem("blogPosts") || "[]");
//Sparar det sparade användarnamnet i localstorage till en konstant
const userLoggedInBlog = localStorage.getItem("user");
//Funktionen kontrollerar om det finns tidigare sparade blogginlägg och isåfall skapar dem.
//Dessutom skapar den en eventlistener på blogginläggsformuläret ifall användaren finns med i localstorage (dvs är inloggad)
//Eventlistener lyssnar efter om formuläret för blogginlägg skickas och isåfall sparar den de olika inputvärdena från formuläret till olika variabler
//Det görs även en check på att alla fält är ifyllda eftersom required i HTML även kan släppa igenom mellanslag eller tomma rader
//En objekt skapas också som innehåller all info som ska finnas i blogginlägget och sedan uppdateras arrayen för blogghistorik och funktionen createBlogPost anropas med konstanten för det nya blogginlägget
function initBlog(){
    if(blogPostHistory.length > 0){
        blogPostHistory.forEach(blogPost => {
            createBlogPost(blogPost);
        });
    }

    if(userLoggedInBlog !== "" && userLoggedInBlog !== null){
        const formBlogPosts = document.getElementById("blog-form");

        formBlogPosts?.addEventListener("submit", e =>{
            e.preventDefault();

            const titel = (document.getElementById("post-caption") as HTMLTextAreaElement).value;
            const content = (document.getElementById("post-content") as HTMLTextAreaElement).value;
            const now = new Date();
            const date = now.toLocaleDateString("sv-SE");

            if(titel.trim() === "" || content.trim() === ""){
                alert("Lämna inga tomma textfält");

                return;
            }

            const newBlogPost: BlogPost = {
                titel: titel,
                content: content,
                user: userLoggedInBlog,
                date: date,
                comments: [],
            };

            blogPostHistory.push(newBlogPost);
            localStorage.setItem("blogPosts", JSON.stringify(blogPostHistory));

            createBlogPost(newBlogPost);
        })
    }
    

}
//Funktionen skapar ett nytt blogginlägg genom att skapa en klon av mallen i HTML och sedan fylla i med informationen som funktionen har anropats med. Efter det töms blogginläggsformuläret så att användaren lätt kan skriva ett nytt inlägg.
//Sedan kopplas formuläret för kommentar till en konstant och även inputen textarea till en annan konstant. Dessa görs en kontroll på så att de inte ger tillbaka null och isåfall så avbryts resten av funktionen.
//Efter det kopplas kommentarsmallen till en konstant och en annan konstant kopplas till listan där kommentarerna kommer hamna. Även dessa kontrolleras så de inte ger tillbaka null.
//Därefter gör en forEach-loop där funktionen createBlogComment anropas för varje kommentar som finns sparat i arrayen för blogkommentarer. Anropet skickas med informationen om det aktuella sparade kommentaren i just det varvet av loopen samt mallen för kommentarer och listan för där kommentaren ska hamna.
//Sedan kontrolleras så att användaren sparad i localstorage inte är lika med null för isåfall så avbryts resten av funktionen.
//Till sist så skapas en eventlistener för kommentarsformuläret som lyssnar efter när formuläret skickas.
//I den så sparas alla värden som behövs i den nya kommentaren och kontrollen för tomt textfält kontrolleras.
//Därefter skapas ett objekt innehållande all info till kommentaren, sedan läggs kommentaren till i arrayen för comments och sparar om hela blogPostHistory i localstorage och till slut anropas funktionen createBlogComment med objektet för kommentaren, listan för kommentarer och mallen för kommentaren.
function createBlogPost(blogPost: BlogPost){
    const postList = document.getElementById("post-ul");
    const template = document.getElementById("post-template") as HTMLTemplateElement | null;

    if(postList === null || template === null){
        return;
    }

    const templateContent = template.content.firstElementChild;
    if(templateContent === null){
        return;
    }

    const blogEl = templateContent.cloneNode(true) as HTMLLIElement;

    const publishCommentElement = blogEl.querySelector<HTMLElement>(".blog-post-publish-comment");
    if(userLoggedInBlog !== null){
        publishCommentElement?.classList.remove("hidden");
    }

    let children = blogEl.children[0].children[0].children;

    children[0].textContent = blogPost.titel;
    children[1].textContent = blogPost.content;
    children[2].textContent = blogPost.user;
    children[3].textContent = blogPost.date;

    (document.getElementById("blog-form") as HTMLFormElement).reset();

    postList.prepend(blogEl);


    const formBlogComments = blogEl.querySelector<HTMLFormElement>(".comment-form");
    if(formBlogComments === null){

        return;
    }

    const commentInput = formBlogComments.querySelector<HTMLTextAreaElement>(".post-comment");
    
    if(commentInput === null){
        return;
    }

    const commentList = blogEl.querySelector<HTMLUListElement>(".comment-ul");
    const commentTemplate = blogEl.querySelector(".comment-template") as HTMLTemplateElement | null;

    if(commentList === null || commentTemplate === null){
        return;
    }

    const commentTemplateContent = (commentTemplate.content.firstElementChild) as HTMLLIElement | null;
    if(commentTemplateContent === null){
        return;
    }

    blogPost.comments.forEach(blogComment =>{
        createBlogComment(blogComment, commentList, commentTemplateContent);
    });

    if(userLoggedInBlog === null){
        return;
    }

    formBlogComments.addEventListener("submit", e =>{
            e.preventDefault();

            const content = commentInput.value;
            const now = new Date();
            const date = now.toLocaleDateString("sv-SE");

            if(content.trim() === ""){
                alert("Fyll i en kommentar för att publicera")
                return;
            }

            const newBlogComment: BlogComment = {
                comment: content,
                user: userLoggedInBlog,
                date: date
            }

            blogPost.comments.push(newBlogComment);
            localStorage.setItem("blogPosts", JSON.stringify(blogPostHistory));

            formBlogComments.reset();

            createBlogComment(newBlogComment, commentList, commentTemplateContent);
        })
}
//Funktionen createBlogComment skapar en kommentar genom att först göra en klon av mallen för kommentarer. 
//Därefter fylls klonen med informationen som funktionen anropades med
//och till sist så läggs det nya li-elementet (kommentaren) till längst upp i listan för kommentarer på just det aktuella inlägget.
function createBlogComment(blogComment: BlogComment, commentList: HTMLUListElement, commentTemplateEl: HTMLLIElement){

    const commentEl = commentTemplateEl.cloneNode(true) as HTMLLIElement;

    let children = commentEl.children[0].children[0].children;

    children[0].textContent = blogComment.comment;
    children[1].textContent = blogComment.user;
    children[2].textContent = blogComment.date;

    commentList.prepend(commentEl);
}

window.onload = initBlog;