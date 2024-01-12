const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const blog = blogs.reduce((favorite, blog) => favorite.likes > blog.likes? favorite : blog, blogs[0])
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  } else {
    return null
  }
}

const mostBlogs = (blogs) => {
  let blogsByAuthor = {}
  let maxAuthor = null
  blogs.forEach(blog => {
    if (blogsByAuthor[blog.author]){
      blogsByAuthor[blog.author]++
    } else {
      blogsByAuthor = {
        ...blogsByAuthor,
        [blog.author]: 1
      }
    }

    if(maxAuthor && maxAuthor.blogs) {
      if(blogsByAuthor[blog.author] > maxAuthor.blogs){
        maxAuthor = {
          author: blog.author,
          blogs: blogsByAuthor[blog.author]
        };
      }
    } else {
      maxAuthor = {
        author: blog.author,
        blogs: 1
      };
    }
  });
  return maxAuthor
}

const mostLikes = (blogs) => {
  let likesByAuthor = {}
  let maxAuthor = null
  blogs.forEach(blog => {
    if (likesByAuthor[blog.author]){
      likesByAuthor[blog.author] = likesByAuthor[blog.author] + blog.likes
    } else {
      likesByAuthor = {
        ...likesByAuthor,
        [blog.author]: blog.likes
      }
    }
    console.log(likesByAuthor, maxAuthor)

    if(maxAuthor && maxAuthor.likes) {
      if (likesByAuthor[blog.author] > maxAuthor.likes) {
        maxAuthor = {
          author: blog.author,
          likes: likesByAuthor[blog.author]
        };
      }
    } else {
      maxAuthor = {
        author: blog.author,
        likes: blog.likes
      };
    }
  });
  return maxAuthor
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}