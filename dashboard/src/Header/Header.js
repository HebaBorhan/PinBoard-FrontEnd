import React from "react";
import header from "./header.png"

function Header() {
  return (
    <header>
      <img 
        src={header} 
        alt="header Logo"
      />
    </header>
  );
}

export default Header;