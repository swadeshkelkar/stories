const router = require("express").Router()
const Post = require("../model/post")
const auth = require("../middleware")
//create post
router.post("/", auth, async (req, res) => {
  console.log(req.body); const newPost = new Post(req.body)
  try {
    const savePost = await newPost.save()
    res.status(200).json(savePost)
  } catch (error) {
    res.status(500).json(error)
  }
})


// update post
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatePost)
      } catch (error) {
        res.status(500).json(error)
      }
    
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete
router.delete("/:id", auth, async (req, res) => {

    const post = await Post.findById(req.params.id);
   
      try {
        await post.delete();
        res.status(200).json("Post Has been deleted!")
      } catch (error) {
        res.status(500).json(error)
      }
    } )

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error)
  }
})

// get all post
router.get("/", async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts
    if (username) {
      posts = await Post.find({ username: username })
    } else if (catName) {
      posts = await Post.find({
        category: catName
      })
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json(error)
  }
})


module.exports = router