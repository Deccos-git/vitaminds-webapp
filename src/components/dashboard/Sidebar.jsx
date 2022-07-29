import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div id='sidebar-container'>
      <div className='sidebar-link-container'>
        <NavLink to="/dashboard/wall" activeClassName="selected">Activiteit</NavLink>
      </div>
      <div className='sidebar-link-container'>
        <NavLink to="/dashboard/stories" activeClassName="selected">Ervaringsverhalen</NavLink>
      </div>
    </div>
  )
}

export default Sidebar