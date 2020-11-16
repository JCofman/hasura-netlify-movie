import React, { ReactElement } from 'react'
import netlifyAuth from '../libs/netlifyAuth'
import * as netlifyIdentity from 'netlify-identity-widget'

type AuthContext = {
  user: netlifyIdentity.User
  isLoggedIn: boolean
  logout: () => void
  login: () => void
}

const authContext = React.createContext<AuthContext>(null)

// You can wrap your _app.js with this provider
export const AuthProvider = ({
  children,
}: {
  children: ReactElement
}): ReactElement => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = (): AuthContext => {
  return React.useContext(authContext)
}

function useProvideAuth() {
  // Store the user in state
  const [user, setUser] = React.useState(null)
  const [isLoggedIn, setLoggedIn] = React.useState(netlifyAuth.isAuthenticated)

  const login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user)
      setUser(user)
    })
  }
  const logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false)
      setUser(null)
    })
  }

  React.useEffect(() => {
    netlifyAuth.initialize((user) => {
      setLoggedIn(!!user)
      setUser(user)
    })
  }, [])

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
}
