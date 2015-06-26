import React from 'react'

export default React.createClass({
  displayName: 'UserBlock',
  render () {
    const {user} = this.props
    let content = ''
    if (user) {
      content = (
        <div>
          Welcome {user.login} <img height="20" width="20" src={user.avatar_url} />&nbsp;&nbsp;<a href='/logout'>Logout</a>
        </div>
      );
    }
    return content;
  }
});