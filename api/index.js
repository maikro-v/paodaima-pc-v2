import Classify from './Classify'
import Article from './Article'
import User from './User'
import Comment from './Comment'

export default axios => ({
  classify: new Classify(axios),
  article: new Article(axios),
  user: new User(axios),
  comment: new Comment(axios)
})
