import {  NavLink, useNavigate} from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();

  const getActive = ({ isActive }) => {
    return isActive
        ? 'text-blue-600 font-medium before:scale-x-100'
        : 'text-gray-600 hover:text-gray-900 before:scale-x-0 hover:before:scale-x-100';
  };

  return (
      <nav className="backdrop-blur-sm border-b border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => navigate('/')}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UniTask
              </h1>
            </div>

            {/* Navigation Links */}
            <div className=" items-center space-x-8">
              <NavLink
                  to="/"
                  className={({ isActive }) => `
                relative px-3 py-2 transition-all duration-300
                before:absolute before:bottom-0 before:left-0 
                before:w-full before:h-0.5 before:bg-blue-600
                before:origin-bottom-left before:transition-transform 
                duration-300 ${getActive({ isActive })}
              `}
              >
                Home
              </NavLink>
              <NavLink
                  to="/About"
                  className={({ isActive }) => `
                relative px-3 py-2 transition-all duration-300
                before:absolute before:bottom-0 before:left-0 
                before:w-full before:h-0.5 before:bg-blue-600
                before:origin-bottom-left before:transition-transform 
                duration-300 ${getActive({ isActive })}
              `}
              >
                About
              </NavLink>
              <NavLink
                  to="/Contact"
                  className={({ isActive }) => `
                relative px-3 py-2 transition-all duration-300
                before:absolute before:bottom-0 before:left-0 
                before:w-full before:h-0.5 before:bg-blue-600
                before:origin-bottom-left before:transition-transform 
                duration-300 ${getActive({ isActive })}
              `}
              >
                Contact
              </NavLink>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button
                  onClick={() => navigate('/Login')}
                  className="relative inline-flex items-center px-6 py-2.5 text-sm font-medium
                bg-gradient-to-r from-blue-600 to-purple-600 text-white
                rounded-full shadow-sm hover:shadow-lg
                transition-all duration-300 hover:scale-105
                before:absolute before:inset-0 before:bg-white/10
                before:rounded-full before:opacity-0
                hover:before:opacity-100"
              >
                Log In
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}
