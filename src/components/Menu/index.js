import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const manuList = [
  { id: "1", label: "Users", linkTo: "users" },
  { id: "2", label: "Teams", linkTo: "teams" },
  { id: "3", label: "Table", linkTo: "table" },
  { id: "4", label: "Matches", linkTo: "matches" },
  { id: "5", label: "Leagues", linkTo: "leagues" },
  { id: "6", label: "Countries", linkTo: "countries" }
]

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        { "<&Soccer/>" }
      </Link>
      <div className="">
        <ul className="navbar-nav">
          {
            manuList.map( ( menu ) => {
              return (
                <li key={menu.id} className="nav-item">
                  <NavLink className="nav-link" to={`/${menu.linkTo}`} exact>
                    {menu.label}
                  </NavLink>
                </li>
              )
            } )
          }
        </ul>
      </div>
    </nav>
  )
}

export default Menu