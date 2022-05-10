const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
// const register = async (req, res) => {
//     try {
//         const newUser = new User({
//             username: req.body.username,
//             password: CryptoJS.AES.encrypt(
//                 req.body.password,
//                 process.env.PASS_SECKEY
//             ).toString(),
//         });
    
//         const savedUser = await newUser.save();

//         const accessToken = jwt.sign(
//             { id: savedUser._id, username: savedUser.username },
//             process.env.JWT_SECKEY,
//             { expiresIn: "200d" }
//         );

//         const { password, ...others } = savedUser._doc;

//         return res.status(201).json({ ...others, accessToken });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// }

// LOGIN
const login = async (req, res) => {
    try {
        // const user = await User.findOne({ username: req.body.username });
        const user = await User.findOne({ username: "usuario" });
        
        if ( !user )
            return res.status(401).json("Wrong password or username!");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECKEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if ( originalPassword !== req.body.password )
            return res.status(401).json("Wrong password or username!");

        // const accessToken = jwt.sign(
        //     { id: user._id, username: user.username },
        //     process.env.JWT_SECKEY,
        //     { expiresIn: "200d" }
        // );

        const { password, username, ...others } = user._doc;

        return res.status(200).json({ ...others, username: req.body.username, apiKey: process.env.API_KEY });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


// module.exports = { register, login };
module.exports = { login };