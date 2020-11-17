import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

import ProfileAvatar from './ProfileAvatar'
import { useAuth } from '../contexts/auth'

const MyLink = ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  if (router.pathname === href) {
    className = `${className} bg-gray-900`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

const Nav = (): JSX.Element => {
  const { user, isLoggedIn, login, logout } = useAuth()

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img
                className="block lg:hidden h-8 w-auto"
                src="/logo.svg"
                alt="movie logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="/logo.svg"
                alt="Workflow logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <MyLink href="/">
                  <a className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                    Movies
                  </a>
                </MyLink>
                <MyLink href="/admin">
                  <a className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                    Admin
                  </a>
                </MyLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button aria-label="User menu" aria-haspopup="true">
                      <ProfileAvatar email={user && user.email}></ProfileAvatar>
                    </Menu.Button>

                    <Transition
                      show={open}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                      >
                        {user && user.email ? (
                          <div className="px-4 py-3">
                            <p className="text-sm leading-5">Signed in as</p>
                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                              {user && user.email}
                            </p>
                          </div>
                        ) : (
                          ''
                        )}

                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => {
                              return (
                                <>
                                  {isLoggedIn ? (
                                    <a
                                      href="#"
                                      className={`${
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700'
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                      role="menuitem"
                                      onClick={() => logout()}
                                    >
                                      Sign out
                                    </a>
                                  ) : (
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                      role="menuitem"
                                      onClick={() => login()}
                                    >
                                      Sign in
                                    </a>
                                  )}
                                </>
                              )
                            }}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3">
          <Link href="/">
            <a className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
              Movies
            </a>
          </Link>
          <Link href="/admin">
            <a className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
              Admin
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default Nav
