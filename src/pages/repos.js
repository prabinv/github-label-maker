import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  render () {
    const {repos} = this.props

    return (
      <div>
        <h2>Repos</h2>
        <ul>
          {repos.map((repo) => {
            return (
              <li key={repo.id}>
                <span className="octicon octicon-repo"></span> <a href={repo.appUrl}>{repo.full_name}</a>
                   &nbsp;(<a href={repo.githubUrl} target="_blank">Go to Github</a>)
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})