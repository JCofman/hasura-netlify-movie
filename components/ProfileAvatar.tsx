import React, { ReactElement } from 'react'

type ProfileAvatarProps = {
  email: string
}

const ProfileAvatar = ({ email }: ProfileAvatarProps): ReactElement => {
  const unavatarEmail = email && `https://unavatar.now.sh/${email}`
  const unavatar = unavatarEmail
    ? unavatarEmail
    : `https://unavatar.now.sh/test`

  return (
    <img
      className="h-8 w-8 rounded-full"
      src={unavatar}
      alt={`Profile Picture`}
      width={40}
      height={40}
    ></img>
  )
}
export default ProfileAvatar
