import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import SignInOutButton from './SignInOutButton';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain" // height
            />
          </Link>

          {/* Nav Links */}
          <ul className="flex space-x-6 text-base font-medium text-gray-200">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/projects" className="hover:text-white transition">Projects</Link></li>
            <li><Link to="/qualification" className="hover:text-white transition">Qualification</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section: Sign In/Out Button */}
        <div className="flex-shrink-0">
          <SignInOutButton />
        </div>
      </div>
    </nav>
  );
}
