# [lead block sports](https://www.leadblocksports.blog/)

**lead block sports** is a sports blog focusing on football and basketball news & analysis.

---

i developed the blog site using only vanilla javascript and custom css -- no libraries or frameworks. 

all blog post metadata is stored in a local json file, and the actual blog post text content lives 
in html files.

asynchronous methods fetch data from the main blog json file and allow the visitor to search by article 
author, post title, or tag. render methods rewrite the DOM using the retrieved data/search results, 
displaying the requested article, author history, or tagged content on the page. the document is also 
dynamically updated as the user switches between light/dark mode, expands the navigation panel, and
clicks into the search bar.

i used the searchParams web API to develop a method for providing fixed, permanent links to specific 
articles, authors, and tags.

this site will soon be refactored and expanded to make it more maintainable, allowing the author to 
independently post new articles and update blog content.