
// src/components/MainContent.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import logo from '../assets/images/brava.png';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';

const MainContent = ({ toggleSidebar }) => {

   const { user } = useAuth();
  return (
    <div className="main-content">     
        <Outlet />
    </div>
  );
};

export default MainContent;












// // src/components/MainContent.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import SearchComponent from './SearchComponent';
// import logo from '../assets/images/brava.png';
// import { useAuth } from '../context/AuthContext';
// import UserProfile from './UserProfile';

// const MainContent = ({ toggleSidebar }) => {

//    const { user } = useAuth();
//   return (
//     <div className="main-content">
 
//       <main className="content-body">
       
//         <Outlet />
//       </main>

//       <footer className="main-footer elevation">
//         &copy; {new Date().getFullYear()} Brava Control. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default MainContent;






















// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import logo from '../assets/images/brava.png';
// import SearchComponent from './SearchComponent';

// const MainContent = () => {
//   return (
//     <div className="main-content">
      
//       <header className="main-header elevation">
//         <div className="user-name">Hi, John Doe</div>
//         <div className="avatar">
//           <img src={logo} alt="User Avatar" />
//         </div>
//       </header>

//       <section className="page-title elevation">
//         <SearchComponent />
//       </section>

//       <main className="content-body">
 
//         <Outlet />
//       </main>

//       <footer className="main-footer elevation">
//         &copy; {new Date().getFullYear()} Brava Control. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default MainContent;
