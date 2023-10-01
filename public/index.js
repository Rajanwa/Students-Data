const path = require("path");
const express = require("express");
const app = express()
var hbs = require("hbs");
// const requests = require("requests")
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./userimages"))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})
const upload = multer({ storage: storage })
// const hbs = require("hbs")
const LogInCollection = require("./mongoos/mongo");
// const { profile } = require("console");
app.use(express.static('public'))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: false }))

const templates = path.join(__dirname, "/templates/views")
const partition = path.join(__dirname, "/templates/partial")
app.set("view engine", "hbs");
app.set("views", templates);

hbs.registerPartials(partition)

app.get("/", (req, res) => {
    res.render('registration');
})

app.get("/registration", (req, res) => {
    res.render('registration');
})

app.post('/registration', upload.single('image'), async (req, res) => {
    try {
        const data = new LogInCollection({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            education: req.body.education,
            image: req.file.filename,
            experience: req.body.experience,
            password: req.body.password
        })
        const result = await data.save()
        res.render("login");
    } catch (err) {
        console.log(err)
    }

})

app.get("/login", (req, res) => {

    res.render('login');
})
// app.get("/admin", (req, res) => {

//     res.render('admin');
// })
app.get("/fine", (req, res) => {

    res.render('profile');
})

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ $or: [{ email: req.body.email }, { name: req.body.email }] })
        if (check.password == req.body.password) {
            // console.log(check.name)
            res.status(201).render("admin")
        }
        else {
            res.send("incorrect password")
        }

    }

    catch (e) {
        res.send("wrong details")
    }

})

app.post('/admin', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ $or: [{ contact: req.body.number }, { name: req.body.name }] })
        // console.log(check.name)
        // console.log(check.contact)
        if (check.name == req.body.name && check.contact == req.body.number) {
            // console.log(check.name)
            res.status(201).render("profile", {
                login: ` ${check.name}`,
                image: `${check.image}`,
                name: ` ${check.name}`,
                Mobile: `${check.contact}`,
                email: `${check.email}`,
                education: `${check.education}`,
                experience: `${check.experience}`
            })
        }
        else {
            res.send("incorrect password")
        }

    }

    catch (e) {
        res.send("wrong details")
    }

})


app.get("/profile", (req, res) => {
    res.send('For Connectivity, Registration and Login is Necessary');
    // res.render('profile')
})

app.post("/profile", (req, res) => {
    res.send("You are verified...")
})
app.get("/connect", (req, res) => {
    res.render('connections');
})
app.listen(8000, "127.0.0.1");
