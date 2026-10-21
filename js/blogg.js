"use strict";
const blogPostHistory = JSON.parse(localStorage.getItem("blogPosts") || "[]");
const userLoggedInBlog = localStorage.getItem("user");
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
                alert("Fyll i både rubrik och text");
                return;
            }
            const newBlogPost = {
                titel: titel,
                user: userLoggedInBlog,
                content: content,
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
function createBlogPost(blogPost) {
    const postList = document.getElementById("post-ul");
    const templateEl = document.getElementById("placeholder-posts");
    if (postList === null || templateEl === null) {
        return;
    }
    const blogEl = templateEl.cloneNode(true);
    blogEl.removeAttribute("id");
    blogEl.classList.remove("hidden-post-template");
    let children = blogEl.children[0].children;
    children[0].textContent = blogPost.titel;
    children[1].textContent = blogPost.user;
    children[2].textContent = blogPost.content;
    children[3].textContent = blogPost.date;
    blogEl.dataset.id = blogPost.id;
    document.getElementById("blog-form").reset();
    postList.prepend(blogEl);
    const formBlogComments = blogEl.querySelector("#comment-form");
    if (formBlogComments === null) {
        return;
    }
    const commentInput = formBlogComments.querySelector("#post-comment");
    if (commentInput === null) {
        return;
    }
    const commentList = blogEl.querySelector("#comment-ul");
    const commentTemplateEl = blogEl.querySelector("#placeholder-comments");
    if (commentList === null || commentTemplateEl === null) {
        return;
    }
    blogPost.comments.forEach(blogComment => {
        createBlogComment(blogComment, commentList, commentTemplateEl);
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
            date: date,
            user: userLoggedInBlog
        };
        blogPost.comments.push(newBlogComment);
        localStorage.setItem("blogPosts", JSON.stringify(blogPostHistory));
        formBlogComments.reset();
        createBlogComment(newBlogComment, commentList, commentTemplateEl);
    });
}
function createBlogComment(blogComment, commentList, commentTemplateEl) {
    const commentEl = commentTemplateEl.cloneNode(true);
    commentEl.removeAttribute("id");
    commentEl.classList.remove("hidden-post-template");
    let children = commentEl.children[0].children;
    children[0].textContent = blogComment.comment;
    children[1].textContent = blogComment.date;
    children[2].textContent = blogComment.user;
    commentList.prepend(commentEl);
}
window.onload = initBlog;
