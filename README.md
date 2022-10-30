# RESTful-API-design
Designing a RESTful API that interacts with a MongoDB database, using Mongoose, based on the HTTP verbs passed to it.

Technologies learned and used:
- Node.js
- Express.js
- MongoDB using Mongoose
- Postman for testing
- Body parser for incoming post requests
- EJS for dynamic rendering
- Express.js parameters for dynamic routing




Note to self:

+ HTTP verb => CRUD Operation:
  - GET => READ
  - POST => CREATE
  - PUT & PATCH => UPDATE
  - DELETE => DELETE
  
+ PUT creates a new entry into the database
while
PATCH just modifies the old entry rather than replacing it.

+ Define a mongoose schema before calling mongoose methods => "
const articlesSchema = new mongoose.Schema({
  title: String,
  content: String
});"

+ The new collection's name passed through mongoose must be defined using a "Singular" name. Mongoose will update the name in the dadabase to "Plural" automatically. Fun fact, it uses Lodash package to do the singular to plural conversation in the background. <br>
  For example "Article" becomes "Articles" and "Person" becomes "People"
  <br> "const Article = mongoose.model('Article', articlesSchema);"

