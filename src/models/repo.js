import Model from 'ampersand-model'
import LabelCollection from './label-collection'

export default Model.extend({
  url () {
    return 'https://api.github.com/repos/' + this.full_name;
  },
  props: {
    id: 'number',
    name: 'string',
    full_name: 'string'
  },

  collections: {
    labels: LabelCollection
  },

  derived: {
    appUrl: {
      deps: ['full_name'],
      fn () {
        return '/repo/' + this.full_name;
      }
    },
    githubUrl: {
      deps: ['full_name'],
      fn () {
        return 'https://github.com/' + this.full_name;
      }
    }
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments);
    this.labels.fetch()
  }
})