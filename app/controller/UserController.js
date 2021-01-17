import Users from "../model/User.js";
import config from "../config/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


exports.register = async (req, res) => {


    const newUser = new Users({
        nama: req.body.nama,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    try {
        // Validasi Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var checkmail = mailformat.test(req.body.email);
        if (!checkmail) throw Error("Email tidak valid");

        const searchUser = await Users.findOne({
            email: req.body.email,
        });
        if (searchUser) throw Error("User telah terdaftar");
        const user = await newUser.save();
        if (!user) throw Error("gagal input data user");
        res.status(200).json({
            "error": false,
            "message": "Anda berhasil mendaftar, silahkan login",
            "user": {
                id: user._id,
                nama: user.nama,
                email: user.email,
                password: user.password
            }
        });
    } catch (error) {
        res.status(400).json({
            "error": true,
            msg: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        // Validasi Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var checkmail = mailformat.test(req.body.email);
        if (!checkmail) throw Error("Email tidak valid");


        const user = await Users.findOne({
            email: req.body.email
        });
        if (!user) throw Error("Email yang anda masukan salah");
        const validPassword = await bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword) throw Error("password salah");
        await jwt.sign(
            { user },
            config.secret,
            {
                expiresIn: 86400,
            },
            (error, token) => {
                res.status(200).json({
                    "error": false,
                    message: "Login Berhasil",
                    user,
                    token,
                });
            }
        );
    } catch (error) {
        res.status(400).json({
            "error": true,
            msg: error.message
        });
    }
};
