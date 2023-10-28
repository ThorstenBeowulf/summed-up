const db = require('../config/connection');
const { User, Post, Category } = require('../models');
const cleanDB = require('./cleanDB');
const { category, user, post } = require('./Data');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('User', 'users');
  await cleanDB('Post', 'posts');

  const categories = await Category.insertMany(category);

  console.log('categories seeded');

  const users = await User.insertMany(user);

  console.log('users seeded');

  const userIds = [];
  users.map((user) => userIds.push(user._id));
  console.log(userIds);

  const categoryIds = [];
  categories.map((category) => categoryIds.push(category._id));
  console.log(categoryIds);

  post.map(async (aPost) => {
    aPost.author = userIds[Math.floor(Math.random() * userIds.length)];
    aPost.categories = categoryIds[Math.floor(Math.random() * categoryIds.length)];
    console.log(aPost);
  })

  const posts = await Post.insertMany(post);

  const postIds = [];
  posts.map((post) => postIds.push(post._id));
  console.log(postIds);
  // users.map((user) => user.posts = )

  console.log('posts seeded');

  process.exit();
});