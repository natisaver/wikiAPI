# wikiAPI
## Installation
cd to project directory
Use the package manager [npm](https://nodejs.org/en/download/) to install modules.

you can use Robo 3T for GUI Interface

```bash
npm init
npm i express ejs mongoose
npm i -g nodemon
```

Can download postman (acts as the req.body) to do testing of the api

How to add mongoose stuff
```bash
mongoose.connect("localhost:27017/userDB",{useNewUserParser: true}); //userDB is the DB i want to create
const userSchema = {
	title: String,
	contnet: String
}

const User = new mongoose.model("User", userSchema) //model accepts 2 params, singular name of ur collection and then the schema

app.post("/register", function(req,res){
	const newUser = new User({ //calling User model
		title: req.body.username
		password: req.body.password
}) 
newUser.save()
})
```
