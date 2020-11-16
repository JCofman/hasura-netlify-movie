import * as netlifyIdentity from 'netlify-identity-widget'

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  initialize(callback: (user: netlifyIdentity.User) => void): void {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.on('init', (user) => {
      this.user = user
      callback(user)
    })
    netlifyIdentity.init()
  },
  authenticate(callback: (user: netlifyIdentity.User) => void): void {
    this.isAuthenticated = true
    netlifyIdentity.open()
    netlifyIdentity.on('login', (user) => {
      this.user = user
      callback(user)
      netlifyIdentity.close()
    })
  },
  signout(callback: () => void): void {
    this.isAuthenticated = false
    netlifyIdentity.logout()
    netlifyIdentity.on('logout', () => {
      this.user = null
      callback()
      netlifyIdentity.close()
    })
  },
}

export default netlifyAuth
