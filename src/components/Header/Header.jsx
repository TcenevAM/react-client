import React from 'react';
import search from "../../Vector.svg";
import c from "./Header.module.css";


let Header = () =>
{
  return (
    <header className={c.header}>
      <div className={c.title}>
        AB Test Real
      </div>
      <div className={c.inputWrapper}>
        <img className={c.img} src={search} />
        <input type="text" className={c.input} />
      </div>
    </header>
  )
}

export default Header;