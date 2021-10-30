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

// route renders the post page
router.get("/comment/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, 
            {
                include: [
                    {
                        model: User,
                        attributes: ["userName"]
                    }
                ]
            });

        const post = postData.get({ plain: true });

        res.render("comment", {
            post,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);

    }
});