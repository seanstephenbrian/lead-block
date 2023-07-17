# [lead block sports api](https://api.leadblocksports.blog/)

this is the back end for **lead block sports**, a full-stack sports blog platform.

i developed the api with node.js and express, and i used pug as the templating engine
to render pages for the custom admin dashboard.

the express api is set up to handle traffic to the root directory and to /admin and
/articles routes and various other one-off paths.

the api uses mongoose middleware to make the appropriate requests to mongodb. 
if requesting content, it processes the results and returns them to the react front-end for rendering.

i used the passport.js and bcrypt middleware libraries for administrator authentication
and password hashing. within the administrator dashboard, i embedded a tinymce-powered 
rich text editor to enable the site administrator to add some basic styles.

the admin dashboard is fully CRUD-enabled, allowing the site owner to modify any field 
within the article document, create new articles, and stage in-progress articles as unpublished drafts.

'delete' requests require the user to re-confirm their intention before the api actually 
deletes the article from mongodb. however, when the article is deleted, 
a copy of the document is automatically saved to a separate 'archived' collection in the database, 
ensuring that no blog content is ever accidentally lost.

basic css styles applied to the pug-generated html create an uncluttered and pleasant user
experience.