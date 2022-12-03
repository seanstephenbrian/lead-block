(() => {

// methods for retrieving, processing, and rendering the blog content:
const Blog = (function () {

    // asynchronous functions to retrieve information from the blog file:

    async function getArticleByNum(articleNum) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                const result = blog.find(post => parseInt(post.article) === parseInt(articleNum));
                console.log(result);
                renderPost(result);
            });
    }

    async function searchByAuthor(name) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                let results = [];
                for (const post in blog) {
                    if (blog[post].author.toLowerCase() === name.toLowerCase()) {
                        results.push(blog[post]);
                    }
                }
                reverseChron(results);
                search(results, name);
            });
    }

    async function searchByTag(query) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                let results = [];
                for (const post in blog) {
                    let processedTags = [];
                    blog[post].tags.forEach(tag => {
                        processedTags.push(tag.toLowerCase());
                    });
                    if (processedTags.includes(query.toLowerCase())) {
                        results.push(blog[post]);
                    }
                }
                // if the query doesn't return any results for tags, automatically use the same search input to look for an author:
                if (results.length === 0) {
                    searchByAuthor(query);
                } else {
                    reverseChron(results);
                    search(results, query.toLowerCase());
                }
            });
    }
    
    // sort an array of blog articles in reverse chronological order:
    function reverseChron(items) {
        items.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    // retrieve a post from blog storage, then fire the renderPost function:
    function getPost(id) {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                reverseChron(blog);
                renderPost(blog[id]);
            });
    }

    // retrieve the 6 most recent articles & render them to the recent links section:
    function getRecents() {
        fetch('blog.json')
            .then((response) => response.json())
            .then((blog) => {
                reverseChron(blog);
                for (let i = 0; i < 6; i++) {
                    if (blog[i]) {
                        renderRecent(blog[i]);
                    }
                }
            });
    }

    // RENDER METHODS:
    
    // render a retrieved blog post to the page:
    async function renderPost(post) {

        const title = document.querySelector('.title');
        title.textContent = post.title;

        const author = document.querySelector('.author');
        author.textContent = post.author;
        author.addEventListener('click', () => {
            Blog.searchByAuthor(post.author);
        });

        const date = document.querySelector('.date');
        date.textContent = post.date;

        const postBody = document.querySelector('.post-body');
        fetch(`posts/${post.article}.html`)
            .then((response) => response.text())
            .then((content) => {
                postBody.innerHTML = content;
                // ensure that the correct theme is applied to post body text & divider imgs:
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                    Page.changeToDark();
                } else if (theme === 'light') {
                    Page.changeToLight();
                }  
            });

        const tags = document.querySelector('.tags');
        // empty out any previous tags:
        tags.innerHTML = '';
        for (const tag in post.tags) {
            const newTag = document.createElement('div');
            newTag.classList.add('tag');
            newTag.textContent = post.tags[tag];
            tags.appendChild(newTag);
            newTag.addEventListener('click', () => {
                searchByTag(post.tags[tag]);
            });
        }
    }

    // render a preview of a recent post:
    function renderRecent(recentPost) {

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
            renderPost(recentPost);
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

        // clear out post body inner html:
        const postBody = document.querySelector('.post-body');
        postBody.innerHTML = '';

        // create a title for the search results:
        const searchTitle = document.createElement('div');
        searchTitle.classList.add('search-title');
        if (results.length > 1) {
            searchTitle.textContent = `${results.length} results for "${query}":`;
        } else if (results.length === 1) {
            searchTitle.textContent = `${results.length} result for "${query}":`;
        } else {
            searchTitle.textContent = `No results found for "${query}".`;
        }
        
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

            // add click listener to trigger post render function:
            searchResult.addEventListener('click', () => {
                renderPost(results[result]);
            })
        }

    }

    return {
        getPost,
        getRecents,
        searchByTag,
        searchByAuthor,
        getArticleByNum
    }

})();

const Page = (function() {
    function fillCopyright() {
        const copyright = document.querySelector('.copyright');
        const year = new Date().getFullYear();
        copyright.textContent = `Copyright © Lead Block Sports ${year}`;
    }
    
    function addInitialListeners() {
        const logo = document.querySelector('.logo');
        logo.addEventListener('click', () => {
            Blog.getPost(0);
        });

        const dark = document.querySelector('.dark');
        dark.addEventListener('click', changeToDark);

        const light = document.querySelector('.light');
        light.addEventListener('click', changeToLight);

        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', renderNav);
    
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
            searchInput.setAttribute('placeholder', 'Search by tag (e.g. "football")');
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
            Blog.searchByTag(query);
        }
    }

    function renderNav() {
        const body = document.querySelector('body');

        const topMatter = document.querySelector('.top-matter');
        topMatter.classList.add('hide');

        const nav = document.createElement('div');
        nav.classList.add('nav');
        body.appendChild(nav);

        const navLinks = document.createElement('ul');
        navLinks.classList.add('nav-links');
        nav.appendChild(navLinks);

            const aboutLink = document.createElement('li');
            aboutLink.classList.add('about-link', 'nav-link');
            aboutLink.textContent = 'About';
            navLinks.appendChild(aboutLink);
            aboutLink.addEventListener('click', () => {
                renderAbout();
                closeNav();
            });

            const footballLink = document.createElement('li');
            footballLink.classList.add('football-link', 'nav-link');
            footballLink.textContent = 'Football';
            navLinks.appendChild(footballLink);
            footballLink.addEventListener('click', () => {
                Blog.searchByTag('football');
                closeNav();
            });

            const basketballLink = document.createElement('li');
            basketballLink.classList.add('basketball-link', 'nav-link');
            basketballLink.textContent = 'Basketball';
            navLinks.appendChild(basketballLink);
            basketballLink.addEventListener('click', () => {
                Blog.searchByTag('basketball');
                closeNav();
            });

            const contactLink = document.createElement('li');
            contactLink.classList.add('contact-link', 'nav-link');
            contactLink.textContent = 'Contact';
            navLinks.appendChild(contactLink);
            contactLink.addEventListener('click', () => {
                renderContact();
                closeNav();
            });

            const closeButton = document.createElement('li');
            closeButton.classList.add('close-button', 'nav-link');
            closeButton.textContent = 'X';
            navLinks.appendChild(closeButton);
            closeButton.addEventListener('click', closeNav);
    }

    function closeNav() {
        const nav = document.querySelector('.nav');
        nav.remove();

        const topMatter = document.querySelector('.top-matter');
        topMatter.classList.remove('hide');
    }

    function renderAbout() {

        // clear out contents of top-info, tags, and previous/next:
        const title = document.querySelector('.title');
        title.innerHTML = '';
        title.textContent = 'About Lead Block';
        const author = document.querySelector('.author');
        author.innerHTML = '';
        const date = document.querySelector('.date');
        date.innerHTML = '';
        const tags = document.querySelector('.tags');
        tags.innerHTML = '';

        // clear out post body inner html:
        const postBody = document.querySelector('.post-body');
        postBody.innerHTML = `
            <p class="no-indent">Lead Block Sports is a platform for quality football and 
            basketball analysis and other exciting updates from the wider world of sports.</p>
            <p class="no-indent">The blog is maintained by Kevin and based out of northern Illinois.</p>
            <p class="no-indent">Feel free to <span class="contact-link">reach out</span> if you're interested in
            collaborating or contributing your content to the site! We're always looking to make new friends.</p>
            <p class="no-indent">You can find Lead Block on Twitter <a href="https://twitter.com/lbkbear" class="twitter-link" target="_blank" rel="noopener noreferrer">here</a>.</p>
            `;

        const contactLink = document.querySelector('.contact-link');
        contactLink.addEventListener('click', renderContact);

    }

    function renderContact() {
        // clear out contents of top-info, tags, and previous/next:
        const title = document.querySelector('.title');
        title.innerHTML = '';
        title.textContent = 'Contact';
        const author = document.querySelector('.author');
        author.innerHTML = '';
        const date = document.querySelector('.date');
        date.innerHTML = '';
        const tags = document.querySelector('.tags');
        tags.innerHTML = '';

        // clear out post body inner html:
        const postBody = document.querySelector('.post-body');
        postBody.innerHTML = `
            <p class="no-indent">You can reach us by email at <a href="mailto:leadblocksports@gmail.com" class="email-link">leadblocksports@gmail.com</a>.</p>
            <p class="no-indent">We're also on Twitter <a href="https://twitter.com/lbkbear" class="twitter-link" target="_blank" rel="noopener noreferrer">here!</a></p>
            `;
    }
    
    function goToTwitter() {
        window.open('https://twitter.com/lbkbear', '_blank');
    }
    
    function changeToDark() {
        document.documentElement.style.setProperty('--bg', '#0d0d0deb');
        document.documentElement.style.setProperty('--text', '#e2e2e2');
        document.documentElement.style.setProperty('--tag-bg', 'var(--dark-tag-bg');
    
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
        document.documentElement.style.setProperty('--bg', 'var(--light-bg)');
        document.documentElement.style.setProperty('--text', '#171717');
        document.documentElement.style.setProperty('--tag-bg', 'var(--light-tag-bg');
    
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

    return {
        fillCopyright,
        addInitialListeners,
        changeToLight,
        changeToDark,
        goToTwitter,
        renderAbout,
        renderContact
    }
})();

// script to run on page load:
(function() {

    // if URL parameters are present, the requested page content is rendered:
    let params = (new URL(document.location)).searchParams;
    const articleNum = params.get('article');
    const author = params.get('author');
    const tag = params.get('tag');
    const page = params.get('page');
    if (articleNum) {
        Blog.getArticleByNum(articleNum);
    } else if (page) {
        if (page === 'about') {
            Page.renderAbout();
        } else if (page === 'contact') {
            Page.renderContact();
        }
    } else if (author) {
        Blog.searchByAuthor(author);
    } else if (tag) {
        Blog.searchByTag(tag);
    // if there are no search params, just render the homepage:
    } else {
        Blog.getPost(0);
    }
    
    Blog.getRecents();

    Page.fillCopyright();

    Page.addInitialListeners();

    // check if user has a theme preference:
    if (localStorage.getItem('theme') === 'light') {
        Page.changeToLight();
    // dark is the default theme:
    } else {
        Page.changeToDark();
    }
    
})();

})();