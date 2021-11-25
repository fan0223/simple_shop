const Blog = require('../models/Blog');

exports.getBlog = async(req, res) => {
    const blogs = await Blog.find({});
    res.render('blog', { blogs: blogs });
};

exports.addBlog = (req, res) => {
    res.render('addBlog');
};

exports.createBlog = async(req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const imagePath = `uploads/${req.file.filename}`;
    await Blog.create({
        title: title,
        desc: desc,
        image: imagePath,
    });
    console.log('new Blog Created');
    res.redirect('/blog');
};