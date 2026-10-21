type BlogComment ={
    comment: string;
    user: string;
    date: string;
}

type BlogPost = {
    titel: string;
    content: string;
    user: string;
    date: string;
    comments: BlogComment[];
    id: string;
}

const blogPostHistory: BlogPost[] = JSON.parse(localStorage.getItem("blogPosts") || "[]");

const userLoggedInBlog = localStorage.getItem("user");

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
            const id = crypto.randomUUID();

            if(titel.trim() === "" || content.trim() === ""){
                alert("Fyll i både rubrik och text");

                return;
            }

            const newBlogPost: BlogPost = {
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
        })
    }
    

}

function createBlogPost(blogPost: BlogPost){
    const postList = document.getElementById("post-ul");

    const templateEl = document.getElementById("placeholder-posts");
    if(postList === null || templateEl === null){

        return;
    }

    const blogEl = templateEl.cloneNode(true) as HTMLLIElement;

    blogEl.removeAttribute("id");
    blogEl.classList.remove("hidden-post-template");

    let children = blogEl.children[0].children;

    children[0].textContent = blogPost.titel;
    children[1].textContent = blogPost.content;
    children[2].textContent = blogPost.user;
    children[3].textContent = blogPost.date;
    blogEl.dataset.id = blogPost.id;

    (document.getElementById("blog-form") as HTMLFormElement).reset();

    postList.prepend(blogEl);


    const formBlogComments = blogEl.querySelector<HTMLFormElement>("#comment-form");
    if(formBlogComments === null){

        return;
    }

    const commentInput = formBlogComments.querySelector<HTMLTextAreaElement>("#post-comment");
    
    if(commentInput === null){
        return;
    }

    const commentList = blogEl.querySelector<HTMLUListElement>("#comment-ul");
    const commentTemplateEl = blogEl.querySelector<HTMLLIElement>("#placeholder-comments");

    if(commentList === null || commentTemplateEl === null){
        return;
    }

    blogPost.comments.forEach(blogComment =>{
        createBlogComment(blogComment, commentList, commentTemplateEl);
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

            createBlogComment(newBlogComment, commentList, commentTemplateEl);
        })
}

function createBlogComment(blogComment: BlogComment, commentList: HTMLUListElement, commentTemplateEl: HTMLLIElement){

    const commentEl = commentTemplateEl.cloneNode(true) as HTMLLIElement;

    commentEl.removeAttribute("id");
    commentEl.classList.remove("hidden-post-template");

    let children = commentEl.children[0].children;

    children[0].textContent = blogComment.comment;
    children[1].textContent = blogComment.user;
    children[2].textContent = blogComment.date;

    commentList.prepend(commentEl);
}

window.onload = initBlog;