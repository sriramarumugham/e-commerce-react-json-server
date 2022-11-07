import React from "react";
import styles from '../styles/Header.module.css';

import {Link} from 'react-router-dom';

function Header() {
  return (
    
      <header className={styles.headerInnerContainer}>
        <nav >
          <div className= {styles.navWrapper}>
            <div className=   {styles.logoContainer}>
           <h1> <Link to="/">UG MONK</Link></h1>
            </div>
            <div className= {styles.toolsContainer}>
            <Link to="/create"> <button>
              <h3><i class="fa-solid fa-plus"></i></h3>
              </button>
              </Link>
              <Link to="/cart">
              <button>
              <h3><i class="fa-solid fa-cart-shopping"></i></h3>
              </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
   
  );
}

export default Header;
