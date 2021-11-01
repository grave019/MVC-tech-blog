const user = require("./user");
const Post = require("./Post");

user.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Post.belongsTo(User, {
    foreignKey: "userId"
});

module.exports = { user, Post };