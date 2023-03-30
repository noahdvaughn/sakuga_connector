import {Link} from 'react-router-dom'
import house from '../assets/white-home-icon-png-21.jpg'
import login from '../assets/loginicon.png'
import Login from '../pages/Login'
import { useEffect, useState } from "react"
import x from '../assets/x.png'


const Sidebar = () => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }


  return(
  <div className='Sidebar'>
    <Link to='/'>
    <img src={house} className='icon'/>
    <p>Home</p>

    </Link>
    <div onClick={toggleModal}>
    <img src={login} className='icon'/>
    <p>Sign-In</p>
    </div>
    {modal && (
    <div className="modal">

      <div className="overlay">
      <img src={x} className='icon' onClick={toggleModal}/>
        <Login />
      </div>
    </div>
    )}
  </div>
  )
}
export default Sidebar