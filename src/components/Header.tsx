import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import './Header.scss';

const Header: React.FC = () => {
  const wishlistCount = useWishlistStore(state => state.getWishlistCount());

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <h1>MovieBrowser</h1>
          </Link>
          
          <nav className="header__nav">
            <Link to="/" className="header__nav-link">
              Home
            </Link>
            <Link to="/wishlist" className="header__nav-link">
              Wishlist
              {wishlistCount > 0 && (
                <span className="header__badge">{wishlistCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
