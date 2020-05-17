const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./mongoose')
const db = require('./mongodb')
const User = require('./user')




app.get('/', (req, res) => {
    res.sendFile('frontend/login.html' , { root : __dirname});
})
app.use(express.urlencoded())

app.post('/create_user', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.sendFile('frontend/profile.html' , { root : __dirname});
    }).catch(() =>{
        console.log('User did not store')
    })
})
app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    current_user = User.findOne({email: email, password: password}, function(err, user){
        if(err) {
            console.log(err)
        }
        if(!user){
            return res.status(404).send();
        }
        else{
            res.sendFile('frontend/profile.html' , { root : __dirname});
            console.log(email)
        }
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
