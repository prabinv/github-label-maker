import React from 'react'

export default React.createClass({
  displayName: 'MessagePage',
  render () {
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        <p>{this.props.body}</p>
        <p>{this.props.children}</p>
      </div>);
  }
})