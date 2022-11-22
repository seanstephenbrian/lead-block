// methods for retrieving and working with the blog content:
const Blog = (function () {

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
    
    function reverseChron(items) {
        items.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    function getAll() {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                reverseChron(blog);
                console.log(blog);
            })
    }
    
    function showPost(id) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                reverseChron(blog);
                Render.post(blog[id]);
            })
    }

    function fillRecents() {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                reverseChron(blog);
                for (let i = 0; i < 6; i++) {
                    if (blog[i]) {
                        Render.recent(blog[i]);
                    }
                }
            })
    }

    return {
        showPost,
        fillRecents
    }

})();

// methods for rendering the retrieved blog content onto the page:
const Render = (function () {

    // render the latest post (this is what renders on initial page load):
    function post(post) {

        const title = document.querySelector('.title');
        title.textContent = post.title;

        const author = document.querySelector('.author');
        author.textContent = post.author;

        const date = document.querySelector('.date');
        date.textContent = post.date;

        const postBody = document.querySelector('.post-body');
        postBody.innerHTML = post.content;

        const tags = document.querySelector('.tags');
        // empty out any previous tags:
        tags.innerHTML = '';
        for (const tag in post.tags) {
            const newTag = document.createElement('div');
            newTag.classList.add('tag');
            newTag.textContent = post.tags[tag];
            tags.appendChild(newTag);
        }
    }

    // render a preview of a recent post to the page:
    function recent(recentPost) {

        const recentLinks = document.querySelector('.recent-links');

        const newLink = document.createElement('div');
        newLink.classList.add('recent-link');
        newLink.classList.add('button');
        recentLinks.appendChild(newLink);

            const linkTitle = document.createElement('div');
            linkTitle.classList.add('link-title');
            linkTitle.textContent = recentPost.title;
            newLink.appendChild(linkTitle);

            const linkDescription = document.createElement('div');
            linkDescription.classList.add('link-description');
            linkDescription.textContent = recentPost.description;
            newLink.appendChild(linkDescription);

        // add a click listener to render the post on click:
        newLink.addEventListener('click', () => {
            post(recentPost);
        })
    }

    return {
        post,
        recent
    }
})();


// other page stuff:

function fillCopyright() {
    const copyright = document.querySelector('.copyright');
    const year = new Date().getFullYear();
    copyright.textContent = `Copyright © Lead Block Sports ${year}`;
}

function addInitialListeners() {
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        Blog.showPost(0);
    });
    const dark = document.querySelector('.dark');
    dark.addEventListener('click', changeToDark);
    const light = document.querySelector('.light');
    light.addEventListener('click', changeToLight);

    const twitter = document.querySelector('.twitter');
    twitter.addEventListener('click', goToTwitter);
}

function goToTwitter() {
    window.open('https://twitter.com/lbkbear', '_blank');
}

function changeToDark() {
    document.documentElement.style.setProperty('--bg', '#0d0d0deb');
    document.documentElement.style.setProperty('--text', '#e2e2e2');

    const svgs = document.querySelectorAll('.svg');
    svgs.forEach(svg => {
        svg.classList.add('svg-dark-mode');
    });

    const logoWords = document.querySelectorAll('.logo-word');
    logoWords.forEach(logoWord => {
        logoWord.classList.add('dark-logo');
    });

    const light = document.querySelector('.light');
    light.classList.remove('selected');
    const dark = document.querySelector('.dark');
    dark.classList.add('selected');

    localStorage.setItem('theme', 'dark');
}

function changeToLight() {
    document.documentElement.style.setProperty('--bg', '#e6f0ff');
    document.documentElement.style.setProperty('--text', '#171717');

    const svgs = document.querySelectorAll('.svg');
    svgs.forEach(svg => {
        svg.classList.remove('svg-dark-mode');
    });

    const logoWords = document.querySelectorAll('.logo-word');
    logoWords.forEach(logoWord => {
        logoWord.classList.remove('dark-logo');
    });

    const dark = document.querySelector('.dark');
    dark.classList.remove('selected');
    const light = document.querySelector('.light');
    light.classList.add('selected');

    localStorage.setItem('theme', 'light');
}

// script to run on page load; if URL parameters are present, the correct search function is fired:
(function() {
    let params = (new URL(document.location)).searchParams;
    const id = params.get('id');
    const author = params.get('author');
    const tag = params.get('tag');
    if (id) {
        Blog.showPost(id);
    } else if (author) {
        Blog.searchAuthor(author);
    } else if (tag) {
        Blog.searchTag(tag);
    // if there are no search params, just render the homepage:
    } else {
        Blog.showPost(0);
    }
    
    Blog.fillRecents();

    fillCopyright();

    addInitialListeners();

    // check if user has a theme preference:
    if (localStorage.getItem('theme') === 'light') {
        changeToLight();
    // dark is the default theme:
    } else {
        changeToDark();
    }
    
})();
