import React, { ReactElement } from 'react'
import Image from 'next/image'

type ProfileAvatarProps = {
  email: string
}

const ProfileAvatar = ({ email }: ProfileAvatarProps): ReactElement => {
  const unavatarEmail = email && `https://unavatar.now.sh/${email}`
  const unavatar = unavatarEmail
    ? unavatarEmail
    : `https://unavatar.now.sh/test`

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="ml-3 relative">
        <div>
          <button
            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <Image
              className="h-8 w-8 rounded-full"
              src={unavatar}
              alt={`Profile Picture`}
              width={50}
              height={50}
            ></Image>
            {/* <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            /> */}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProfileAvatar
