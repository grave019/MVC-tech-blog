const router = require("express").Router();
const { User } = require("../../models");
//route to create a user login session
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userData) {
            res.status(400).json({ message: "Username and Password is needed" });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// route for creating a a profile user
router.post("/", async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        if (!email || !userName || !password ) res.status(400).send("You must add a username, email and password to continue");

        const userData = await User.create({ email, userName, password });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});