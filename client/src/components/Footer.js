import React from 'react';
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
        <div className={styles.socialContainer}>
            <a><i class="fa-brands fa-linkedin"></i></a>
            <a><i class="fa-brands fa-github"></i></a> 
            <a><i class="fa-brands fa-youtube"></i></a>
            <a><i class="fa-brands fa-instagram"></i></a>
        </div>
    </footer>
  )
}

export default Footer