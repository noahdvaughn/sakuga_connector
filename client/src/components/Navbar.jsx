import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import plug from '../assets/plug-solid.svg'
const Navbar = ({user, handleLogOut}) => {
  let navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }


  return(
  <div>
  <header>
    <div className='flex'>
    <img id='plug'src={plug}/>
    <h1>SakugaConnector</h1>
    </div>

    <div className='headerSearch'>
      <input className='headerInput' onChange={handleChange} type="text" onKeyUp={(e)=>{
    if (e.keyCode === 13 && searchValue.length >= 3){
      navigate(`/search/${searchValue}`)
    }}}/> 
    </div>
  </header>
  </div>)
}
export default Navbar