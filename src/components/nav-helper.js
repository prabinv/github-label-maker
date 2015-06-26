import localLinks from 'local-links'
import React from 'react'
import app from 'ampersand-app'

export default React.createClass({
  handleLinkClick () {
    const pathname = localLinks.getLocalPathname(event);

    if(pathname) {
      event.preventDefault();
      app.router.history.navigate(pathname);
    }
  },
  render () {
    return (
      <div onClick={this.handleLinkClick} {...this.props}>
        {this.props.children}
      </div>
    );
  }
});
