const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <div className="antialiased mt-8 text-gray-900 flex items-center justify-center">
      {children}
    </div>
  )
}

export default Layout
