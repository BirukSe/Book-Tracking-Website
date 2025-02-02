
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/home'
import Shelf from './pages/shelf/shelf'
import Explore from './pages/explore/explore'
import Goals from './pages/goals/goals.tsx';
import Login from './pages/Auth/Login/Login.tsx';
import Signup from './pages/Auth/Signup/Signup.tsx';

import Admin from './pages/Admin/admin.tsx';
const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/shelf" element={<Shelf/>}></Route>
    <Route path="/explore" element={<Explore/>}></Route>
    <Route path="/goals" element={<Goals/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
   
    <Route path="/admin" element={<Admin/>}/>

   </Routes>
  )
}

export default App
