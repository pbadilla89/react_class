import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const manuList = [
  { id: "1", label: "Teams", linkTo: "teams" },
  { id: "2", label: "Table", linkTo: "table" },
  { id: "3", label: "Matches", linkTo: "matches" },
  { id: "4", label: "Leagues", linkTo: "leagues" },
  { id: "5", label: "Countries", linkTo: "countries" }
]

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        { "<&Soccer/>" }
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
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