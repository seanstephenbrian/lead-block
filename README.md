# [lead block sports](https://www.leadblocksports.blog/)

**lead block sports** is a sports blog focusing on football and basketball news & analysis.

---

i developed the blog site using only vanilla javascript and custom css -- no libraries or frameworks. 

all blog post metadata is stored in a local json file, and the actual mark-up for blog posts lives 
in discrete html files.

i developed asynchronous methods to fetch data from the main blog json file and search by author, 
article title, or tag. render methods rewrite the DOM using the retrieved data/search results, 
displaying the request article, author history, or tagged content on the page. the document is also 
dynamically updated as the user switches between light/dark mode, expands the navigation panel, and
clicks into the search bar.

this site will soon be refactored and expanded to make it more maintainable and allow the author to 
independently post new articles and update blog content.