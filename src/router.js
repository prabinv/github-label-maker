import React from 'react'
import Router from 'ampersand-router'
import Layout from './layout'
import Login from './pages/login'
import Repos from './pages/repos'
import RepoDetail from './pages/repo-detail'
import MessagePage from './pages/message-page'
import qs from 'qs'
import xhr from 'xhr'
import config from './config'

import app from 'ampersand-app'

function requiresAuth (handlerName) {
  return function () {
    if (app.me.token) {
      this[handlerName].apply(this, arguments);
    } else {
      this.redirectTo('/');
    }
  }
}

export default Router.extend({

  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      );
    }
    React.render(page, document.body);
  },
  routes: {
    '': 'public',
    'repos': requiresAuth('repos'),
    'login': 'login',
    'logout': 'logout',
    'repo/:owner/:name': requiresAuth('repoDetail'),
    'auth/callback?:query': 'authCallback',
    '*fourOhFour': 'fourOhFour'
  },
  public () {
    this.renderPage(<Login />, {layout: false});
  },
  repos () {
    this.renderPage(<Repos repos={app.me.repos} />, {layout: true});
  },
  repoDetail(owner, name) {
    const repo = app.me.repos.getByFullName(owner + '/' + name);
    this.renderPage(<RepoDetail repo={repo} labels={repo.labels} />, {layout: true});
  },
  login () {
    window.location.href ='https://github.com/login/oauth/authorize?' +
      qs.stringify({
        client_id: config.clientId,
        redirect_uri: window.location.origin + '/auth/callback',
        scope: 'repo,user'
      });
  },
  authCallback (query) {
    query = qs.parse(query);

    xhr({
      url: config.authUrl + query.code,
      json: true
    }, (err, req, body) => {
      app.me.token = body.token;
      this.redirectTo('/repos');
    });

    this.renderPage(<MessagePage title="Fetching data" body="Fetching data..." />, {layout: true});
  },
  logout () {
    window.localStorage.clear();
    window.location = '/';
  },
  fourOhFour () {
    this.renderPage(<MessagePage title="Not Found" body="Sorry, nothing here" />, {layout: !!app.me.token});
  }
})