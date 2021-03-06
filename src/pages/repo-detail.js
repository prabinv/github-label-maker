import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import Label from '../components/label-component'

export default React.createClass({
  mixins: [ampersandMixin],
  displayName: 'RepoDetail',
  onAddLabelClick (event) {
    event.preventDefault();
    this.props.labels.add({
      name: '',
      color: 'ffffff',
      url: this.props.labels.url()  ,
      editing: true,
      saved: false
    }, {at: 0});
  },
  render () {
    const {repo, labels} = this.props

    return (<div className='container'>
              <h1>{repo.full_name}</h1>
              <p>
                <button type="button"
                        className="button button-small button-approve"
                        onClick={this.onAddLabelClick}>Add Label</button>
              </p>
              <ul>
                {labels.map( (label) => <Label key={label.name} label={label} /> )}
              </ul>
            </div>);
  }
});