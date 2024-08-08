import './style.scss'

// Importing Assets
import NikeLogo from '@/assets/nike_logo.png'

function Header ({ toggleSidebar }) {
  return (
    <div className="lawful-purple-bg max-z-index position-fixed custom-navbar"> 
        <a href="#home" className="logo-elements-container" onClick={toggleSidebar}>
          <img src={NikeLogo} alt="Logo" className="header-logo"></img>
          <p className="navbar-logo-text">Just Do It.</p>
        </a>
    </div>
  );
}

export default Header;