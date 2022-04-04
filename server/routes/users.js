const express = require ('express');
const router = express.Router();
//const bodyParser = require ('body-parser');
const { User } = require ('../Models/User');


router.post('/register', (req, res) => {
    
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({ success: true });
    });
});


module.exports = router;