import React from 'react';
import c from "./Navbar.module.css";


let Navbar = () =>
{
  return (
    <div>
      <ul className={c.list}>
        <li className={c.listItem}>Projects</li>
        <hr className={c.hr} />
        <li className={c.listItem}>Add new</li>
        <hr className={c.hr} />
        <li className={c.listItem}> Account</li>
        <hr className={c.hr} />
        <li className={c.listItem}>Support</li>
        <hr className={c.hr} />
      </ul>
    </div>
  )
}

export default Navbar;