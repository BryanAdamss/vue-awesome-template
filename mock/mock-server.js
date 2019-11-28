const { posts } = require('./data/post')

module.exports = {
  // goods API
  // 获取商品列表
  'GET /posts'(req, res) {
    return res.json({
      code: 200,
      result: posts
    })
  }
}
