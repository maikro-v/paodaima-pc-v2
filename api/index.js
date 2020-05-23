import Classify from './Classify'
import Article from './Article'

export default axios => ({
  classify: new Classify(axios),
  article: new Article(axios)
})
