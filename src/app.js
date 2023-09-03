const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn")

const Register = require("./models/register")

const port = process.env.PORT|| 3000;        // giving the random port 

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());   // to get what you are writing in your fields of form 
app.use(express.urlencoded({extended:false}));// to get what you are writing in your fields of form 


app.use(express.static(static_path));   // for using the static page=>index.html  it first check for index.html then for other page

app.set("view engine","hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);  //telling we are using partials 

app.get("/",(req,res)=>{
    res.render("index");    //send ke bdle render so that index.hbs can be shown
});
app.get("/register", (req, res) => {
  res.render("register"); //send ke bdle render so that index.hbs can be shown
});

//create a new user in database

app.post("/register",async(req,res)=>{
    try{
        // console.log(req.body.fullname);
        // res.send(req.body.fullname);


        // if two passwords
        // const password = req.body.pass;    // for matching the passwords 
        // const cpassword = req.body.cpass;
        // if( password === cpassword)
        // {
        //     const registerEmployee =   new Register({
        //         name : req.body.fullname,
        //         email : req.body.email,
        //         password: req.body.pass
        //     })                  //storing data to database

        //     const registered = await registerEmployee.save();    //saving to database
        //     res.status(201).render("index");
        // }
        // else{
        //     res.send("password are not matching ")
        // }

        const registerEmployee =   new Register({
                name : req.body.fullname,
                email : req.body.email,
                password: req.body.pass
            })                  //storing data to database

            const registered = await registerEmployee.save();    //saving to database
            res.status(201).render("index");
    }catch{
        res.status(400).send(error);
    }

})
app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.pass;

        // console.log(`${email} the password is ${password}`);
        //checking the data with the database data 
        const useremail = await Register.findOne({email:email});
        // res.send(useremail);
        // console.log(usermail);

        if(useremail.password === password)
        {
            res.status(201).render("index");
        }
        else{
            res.send("invalid login details");
        }


    }
    catch{
        res.status(400).send("invalid login details");
    }
})
app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})