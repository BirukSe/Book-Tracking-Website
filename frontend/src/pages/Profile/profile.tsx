import React from 'react'

const Profile = () => {
    const email=localStorage.getItem('email');
  return (
    <div className="min-h-screen min-w-screen mycolor">
        <div>
            <img src="user-profile.png" className="w-16 h-16 "/>
        </div>
    
        
      
    </div>
  )
}

export default Profile
