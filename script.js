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

    async function searchAuthor(name) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                let results = [];
                for (const post in blog) {
                    if (blog[post].author === name) {
                        results.push(blog[post]);
                    }
                }
                reverseChron(results);
                Render.search(results, name);
            });
    }

    async function search(query) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                let results = [];
                for (const post in blog) {
                    if (blog[post].tags.includes(query)) {
                        results.push(blog[post]);
                    }
                }
                reverseChron(results);
                Render.search(results, query);
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
        fillRecents,
        search,
        searchAuthor
    }

})();

// methods for rendering the retrieved blog content onto the page:
const Render = (function () {

    // render a blog post to the page:
    function post(post) {

        const currentId = post.id;
        const previousId = parseInt(currentId);
        const nextId = parseInt(currentId) + 1;

        const title = document.querySelector('.title');
        title.textContent = post.title;

        const author = document.querySelector('.author');
        author.textContent = post.author;
        author.addEventListener('click', () => {
            Blog.searchAuthor(post.author);
        });

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
            newTag.addEventListener('click', () => {
                Blog.search(post.tags[tag]);
            });
        }

        // render the previous/next arrows:
        // const bottomInfo = document.querySelector('.bottom-info');
        // const theme = localStorage.getItem('theme');
        
        //     const previous = document.createElement('div');
        //     previous.classList.add('previous');
        //     bottomInfo.appendChild(previous);
    
        //         const previousIcon = document.createElement('img');
        //         previousIcon.classList.add('svg');
        //         if (theme === 'dark') {
        //             previousIcon.classList.add('svg-dark-mode');
        //         }
        //         previousIcon.setAttribute('src', 'img/svg/previous.svg');
        //         previousIcon.setAttribute('alt', 'previous post');
        //         previous.appendChild(previousIcon);

        //     previous.addEventListener('click', () => {
        //         alert(previousId);
        //         Blog.showPost(previousId);
        //     });
        
        //     const next = document.createElement('div');
        //     next.classList.add('next');
        //     bottomInfo.appendChild(next);

        //         const nextIcon = document.createElement('img');
        //         nextIcon.classList.add('svg');
        //         if (theme === 'dark') {
        //             nextIcon.classList.add('svg-dark-mode');
        //         }
        //         nextIcon.setAttribute('src', 'img/svg/next.svg');
        //         nextIcon.setAttribute('alt', 'next post');
        //         next.appendChild(nextIcon);        
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

    // render the results of a search:
    function search(results, query) {

        // clear out contents of top-info, tags, and previous/next:
        const title = document.querySelector('.title');
        title.innerHTML = '';
        const author = document.querySelector('.author');
        author.innerHTML = '';
        const date = document.querySelector('.date');
        date.innerHTML = '';
        const tags = document.querySelector('.tags');
        tags.innerHTML = '';


            // will add the previous/next arrows later:
                // const previous = document.querySelector('.previous');
                // if (previous) {
                //     previous.remove();
                // }
                // const next = document.querySelector('.next');
                // if (next) {
                //     next.remove();
                // }

        // clear out post body inner html:
        const postBody = document.querySelector('.post-body');
        postBody.innerHTML = '';

        const searchTitle = document.createElement('div');
        searchTitle.classList.add('search-title');
        searchTitle.textContent = `${results.length} results for "${query}":`;
        postBody.appendChild(searchTitle);

        for (const result in results) {
            const searchResult = document.createElement('div');
            searchResult.classList.add('search-result');
            postBody.appendChild(searchResult);

                const resultTitle = document.createElement('div');
                resultTitle.classList.add('result-title');
                resultTitle.textContent = results[result].title;
                searchResult.appendChild(resultTitle);

                const resultDescription = document.createElement('div');
                resultDescription.classList.add('result-description');
                resultDescription.textContent = results[result].description;
                searchResult.appendChild(resultDescription);

            // add click listener to render post:
            searchResult.addEventListener('click', () => {
                post(results[result]);
            })
        }

    }

    return {
        post,
        recent,
        search
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

    const searchImg = document.querySelector('.search-img');
    searchImg.addEventListener('click', showSearchInput, {once: true});
}

function showSearchInput() {
    const searchImg = document.querySelector('.search-img');
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.setAttribute('src', 'img/svg/close.svg');
    searchIcon.addEventListener('click', removeSearchInput, {once: true});

    const search = document.createElement('div');
    search.classList.add('search');
    searchImg.insertBefore(search, searchIcon);
    
        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.classList.add('search-input');
        search.appendChild(searchInput);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitSearch();
            }
        })

        const submit = document.createElement('div');
        submit.classList.add('search-submit');
        submit.textContent = 'Search';
        search.appendChild(submit);
        submit.addEventListener('click', submitSearch);

}

function removeSearchInput() {
    const search = document.querySelector('.search');
    search.remove();

    const searchIcon = document.querySelector('.search-icon');
    searchIcon.setAttribute('src', 'img/svg/search.svg');
    searchIcon.addEventListener('click', showSearchInput, {once: true});
}

function submitSearch() {
    const query = document.querySelector('.search-input').value;
    if (query) {
        Blog.search(query);
    }
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

    // let params = (new URL(document.location)).searchParams;
    // const id = params.get('id');
    // const author = params.get('author');
    // const tag = params.get('tag');
    // if (id) {
    //     Blog.showPost(id);
    // } else if (author) {
    //     Blog.searchAuthor(author);
    // } else if (tag) {
    //     Blog.searchTag(tag);
    // // if there are no search params, just render the homepage:
    // } else {
    //     Blog.showPost(0);
    // }

    Blog.showPost(0);
    
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
