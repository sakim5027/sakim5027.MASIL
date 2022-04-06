const express = require ('express');
const router = express.Router();
//const bodyParser = require ('body-parser');
const { User } = require ('../Models/User');


router.post('/register', (req, res) => {
    //회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({ success: true });
    });
});

router.post('/login', (req, res) => {

    //요청된 email을 데이터베이스에서 찾는다.
    User.findOne({ email: req.body.email}, (err, user) =>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: 'There is no user with matching email'
            })
        }

        //요청된 email이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false,
                message: 'Password does not match'
            })

            //비밀번호가 맞다면 토큰을 생성한다.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                //토큰을 쿠키에 저장한다 //쿠키,로컬 스토리지,세션 등 저장 가능
                res.cookie('x_auth', user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id
                })

            })

        })

    })

    

    

})


module.exports = router;