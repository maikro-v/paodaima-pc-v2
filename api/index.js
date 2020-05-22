import Classify from './Classify'

export default (axios) => ({
  classify: new Classify(axios)
})
