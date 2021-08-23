/**
 * @author GuangHui
 * @description 文章模型
 */

export class Post {
  static MAX_LEN = 50

  constructor({ body, id, title, userId } = {}) {
    this.body = body
    this.id = id
    this.title = title
    this.userId = userId
  }

  isTitleOverLength() {
    return this.title.length >= Post.MAX_LEN
  }
}
