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

function fillCopyright() {
    const copyright = document.querySelector('.copyright');
    const year = new Date().getFullYear();
    copyright.textContent = `Copyright © Lead Block Sports ${year}`;
}

function addInitialListeners() {
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

}

// script to run on page load; if URL parameters are present, the correct search function is fired:
(function() {
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
        getAll();
    }
    
    fillCopyright();

    addInitialListeners();

    // dark is the default theme:
    changeToDark();
})();
