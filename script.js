// blog search functions:
async function getPost(id) {
    fetch('blog.json')
        .then((response) => response.json())
        .then((blog) => {
            const post = blog[id];
            console.log(post);
        });
}

async function searchAuthor(search) {
    fetch('blog.json')
        .then((response) => response.json())
        .then((blog) => {
            let results = [];
            for (const post in blog) {
                if (blog[post].author === search) {
                    results.push(blog[post]);
                }
            }
            reverseChron(results);
            console.log(results);
        });
}

async function searchTag(search) {
    fetch('blog.json')
        .then((response) => response.json())
        .then((blog) => {
            let results = [];
            for (const post in blog) {
                if (blog[post].tags.includes(search)) {
                    results.push(blog[post]);
                }
            }
            reverseChron(results);
            console.log(results);
        });
}

function reverseChron(posts) {
    posts.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
}

function renderHome() {
    console.log('home');
}

// script to run on page load; if URL parameters are present, the correct search function is fired:
let params = (new URL(document.location)).searchParams;
const id = params.get('id');
const author = params.get('author');
const tag = params.get('tag');
if (id) {
    getPost(id);
} else if (author) {
    searchAuthor(author);
} else if (tag) {
    searchTag(tag);
    // if there are no search params, just render the homepage:
} else {
    renderHome();
}