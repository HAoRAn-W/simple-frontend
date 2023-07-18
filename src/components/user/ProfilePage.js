import React from 'react'


function ProfilePage() {
    const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      {user.username}
    </div>
  )
}

export default ProfilePage
