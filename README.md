# ARTICLE-SERVICE
Implement an article api service with complete CRUD functionalities using Node and MongoDB, adding paginations where necessary. Articles must have a title, body, slug and an image url

### Repo link
`https://github.com/Oluwa-Femi/article-service`

### Technology
- NodeJs(Typescript)
- MongoDb
- Express
- File format - JSON

### Set-Up (To set up project on local)
In the terminal, you can:
* cd into your preferred folder
* run git clone `https://github.com/Oluwa-Femi/article-service`
* create a .env file in the root directory replicating the keys in the sample.env file. Attach values to the keys. 
* run npm install - to set up Node modules and install packages
* run npm run dev - to spin the application
* Use an API tester e.g Postman to run the routes below

### Routes
- 
- `POST http://localhost:${Port}/api/articles` - Create a new resource
- `PUT http://localhost:${Port}/api/articles/:id` - Update a resource
- `GET http://localhost:${Port}/api/articles/:id` - Get one article
- `GET http://localhost:${Port}/api/articles/?page=number&limit=number` - Get all articles. page=1 means page 1, number=5 means the number of records returned on the page. Alternatively, you can also define page,limit as Query Params keys, supplying the numbers as values.  
- `DELETE http://localhost:${Port}/api/articles/:id` - Delete resource

### To run tests
- Run `npm run test` in the terminal

