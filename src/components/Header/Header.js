'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import {LIGHT_TOKENS, DARK_TOKENS, COLOR_THEME_COOKIE} from '@/constants';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleThemeToggle(){
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);

    Cookie.set(COLOR_THEME_COOKIE, updatedTheme, {
      expires: 1000,
    });

    const updatedTokens = updatedTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    root.setAttribute('data-color-theme', updatedTheme);

    Object.entries(updatedTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    })
  }



  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleThemeToggle}>
          {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
