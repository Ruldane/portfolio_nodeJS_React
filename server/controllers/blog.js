const Blog = require('../models/blog')
const AsyncLock = require('async-lock');
const slugify = require('slugify')
const lock = new AsyncLock();

exports.getBlog = (req,res) => {
    Blog.find({status: 'published'}, (error, publishedBlog) => {
        if (error) {
            return res.status(422).send(error)
        }
        return res.json(publishedBlog)
    })
}

exports.getUserBlogs = (req, res) => {
    const userId = req.user.sub;

    Blog.find({userId}, (error, userBlogs)=> {
        if (error){
            return res.status(422).send(error)
        }
        return res.json(userBlogs)
    })
}

exports.getBlogBySlug = (req, res) => {
    const slug = req.params.slug;

    Blog.findOne({slug}, (error, foundBlog)=> {
        if (error){
            return res.status(422).send(error)
        }
        return res.json(foundBlog);
    })
}

// save book
// async-lock block mulit spam button on create blog. Means will create just one blog after push the create button
exports.saveBlog = (req, res) => {
    const lockId = req.query.lockId;

    if (!lock.isBusy(lockId)) {
        lock.acquire(lockId, function(done) {
            const blogData = req.body;
            const blog = new Blog(blogData);

            if (req.user) {
                blog.userId = req.user.sub;
                blog.author = req.user.name;
            }

            blog.save((err, createdBlog) => {
                setTimeout(() => done(), 5000);

                if (err) {
                    return res.status(422).send(err);
                }

                return res.json(createdBlog);
            });
        }, function(err, ret) {
            err && console.error(err)
        });
    } else {
        return res.status(422).send({message: 'Blog is getting saved!'});
    }
}


//get blog by id
exports.getBlogById = (req,res) => {
    const blogId = req.params.id;

    Blog.findById(blogId, (error,foundBlog)=> {
        if (error){
            return res.status(422).send(error)
        }
        return res.json(foundBlog)
    })
}

exports.updateBlog=(req, res)=> {
    const blogId = req.params.id
    const blogData = req.body;

    Blog.findById(blogId, (err, foundBlog) => {
        if (err){
            return res.status(422).send(err)
        }

        if (blogData.status && blogData.status === 'published' && !foundBlog.slug) {
            foundBlog.slug = slugify(foundBlog.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: false,      // convert to lower case, defaults to `false`
                strict: false,     // strip special characters except replacement, defaults to `false`
            })
        }


        foundBlog.set(blogData);
        foundBlog.updatedAt = new Date();
        foundBlog.save((err, saveBlog) => {
            if (err){
                return res.status(422).send(err)
            }
            return res.json(saveBlog)
        })
    })
}


exports.deleteBlog= (req, res) =>{
    const blogId = req.params.id

    Blog.deleteOne({_id: blogId}, (err, deletePortfolio) =>{
        if (err){
            return res.status(422).send(err)
        }
        return res.json({status: 'DELETED'})
    })
}
