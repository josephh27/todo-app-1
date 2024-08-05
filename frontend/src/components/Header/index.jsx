import Container from 'react-bootstrap/Container';
import './style.scss'

// Importing Assets
import NikeLogo from '@/assets/nike_logo.png'

function CollapsibleExample() {
  return (
    <div className="lawful-purple-bg max-z-index position-fixed custom-navbar"> 
        <a href="#home" className="logo-elements-container">
          <img src={NikeLogo} alt="Logo" className="header-logo"></img>
          <p className="navbar-logo-text">Just Do It.</p>
        </a>
    </div>
  );
}

export default CollapsibleExample;