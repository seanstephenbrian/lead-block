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
            for (const post in blog) {
                if (blog[post].author === search) {
                    console.log(blog[post]);
                }
            }
        });
}


async function searchTag(search) {
    fetch('blog.json')
        .then((response) => response.json())
        .then((blog) => {
            for (const post in blog) {
                if (blog[post].tags.includes(search)) {
                    console.log(blog[post]);
                }
            }
        });
}