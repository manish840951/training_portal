
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { loginWithRedirect,user} = useAuth0();
  const { logout,isAuthenticated} = useAuth0();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle sign out (you can add your own logic here)
  function handleSignOut() {
    alert('Signed out!');
    setDropdownOpen(false);
    // Add your sign-out logic here
  }

  // Handle dropdown navigation
  function handleDropdownNav(path) {
    navigate(path);
    setDropdownOpen(false);
  }

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.leftNav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/courses" style={styles.link}>Courses</Link>
          <Link to="/about" style={styles.link}>About</Link>
          {isAuthenticated && <p>{"Welcome"}</p>}
          {isAuthenticated?(
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
          ):
          (
             <button onClick={() => loginWithRedirect()}>Log In</button>
          )
          }

        </div>
        <div style={styles.profileContainer} ref={dropdownRef}>
          <div
            style={styles.profileIcon}
            onClick={() => setDropdownOpen((open) => !open)}
            tabIndex={0}
            aria-label="Profile"
          >
            

            {/* Simple profile icon (circle with user emoji) */}
            <span role="img" aria-label="profile" style={{ fontSize: 24 }}>👤</span>
          </div>
          {dropdownOpen && (
            <div style={styles.dropdown}>
              {isAuthenticated?(
                <div
                style={styles.dropdownItem}>
                  {user.name}
              </div>
              ):null}
              {isAuthenticated?(<div
                style={styles.dropdownItem}
                onClick={()=>logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                Log out
              </div>):null}
              
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

// Simple inline styles for layout
const styles = {
  header: {
    width: '100%',
    background: '#222',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '0',
    marginBottom: '30px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 900,
    margin: '0 auto',
    padding: '10px 20px',
  },
  leftNav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background 0.2s',
  },
  profileContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  profileIcon: {
    background: '#444',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid #888',
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '48px',
    background: '#fff',
    color: '#222',
    borderRadius: '6px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    minWidth: '140px',
    zIndex: 10,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    background: '#fff',
    fontSize: '15px',
    transition: 'background 0.2s',
  },
};

// Add hover effect for dropdown items
styles.dropdownItem[':hover'] = {
  background: '#f5f5f5',
};

export default Header;
