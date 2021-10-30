const router = require("express").Router();
const { Post, User } = require("../../models");
//route to create a post
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).send("Need to fill out form");
        }
        else {
            const newPost = await Post.create({ title, content, userId: req.session.userId });

            res.status(200).json(newPost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to update a post
router.put("/:id", async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).send("Need to fill out form");
        }
        else {
            const newPost = await Post.update(
                {
                    title,
                    content,
                },
                {
                    where: {
                        id: req.params.id
                    },
                },
            );

            res.status(200).json(newPost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});