const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <div className="antialiased text-gray-900 flex items-center justify-center min-h-screen">
      {children}
    </div>
  )
}

export default Layout
