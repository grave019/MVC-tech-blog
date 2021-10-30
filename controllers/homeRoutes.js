const router = require("express").Router();
const { Post, User } = require("../models");
// route to render the homepage
router.get("/", async (req, res) => {
    try {
        const blogData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["userName"]
                }
            ]
        });
        const posts = blogData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});