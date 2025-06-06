
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';
import  placeHolder  from '../assets/images/placeHolder.png';
import { TbCreditCardPay } from "react-icons/tb";
import { CiSquareRemove } from "react-icons/ci";

export default function MerchantDropdownSelector({ onSelect }) {
  const { axiosInstance } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dropdownRef = useRef(null);

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page - 1);
      if (search) params.append('merchantSerialCode', search);
      const res = await axiosInstance.get(
        `http://localhost:9999/merchants/search?${params.toString()}`
      );
      setMerchants(res.data?.content || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch merchants:', err);
      setMerchants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchMerchants();
  }, [search, page, open]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (merchant) => {
    setSelectedMerchant(merchant);
    setSearch('');
    onSelect && onSelect(merchant);
    setOpen(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setSelectedMerchant(null);
    setSearch('');
    onSelect && onSelect(null);
    setOpen(false);
  };

  return (
    <div className="merchantDropdownSelector-wrapper">
      <div className="merchantDropdownSelector-dropdown" ref={dropdownRef}>
        <div className="merchantDropdownSelector-triggerWrapper">



          <button
            className="merchantDropdownSelector-trigger"
            onClick={() => setOpen(!open)}
          >
            {selectedMerchant ? (
              <>
                <div className="merchantDropdownSelector-selectedInfo">
                  <img
                    src={selectedMerchant.avatarUrl ? selectedMerchant.avatarUrl :placeHolder}
                    alt={selectedMerchant.username}
                    className="merchantDropdownSelector-avatar"
                  />
                  <div className="merchantDropdownSelector-info">
                    <span className="merchantDropdownSelector-name">
                      {selectedMerchant.username}
                    </span>
                    <span className="merchantDropdownSelector-code">
                      {selectedMerchant.merchantSerialCode}
                    </span>
                  </div>
                </div>
                <button
                  className="merchantDropdownSelector-resetBtn"
                  onClick={handleReset}
                  title="Reset to All Merchants"
                >

                        <CiSquareRemove style={{ fontSize: '28px', color: 'black' }} />
                 
                </button>
              </>
            ) : (
              'All Merchants'
            )}
          </button>






          
        </div>

        {open && (
          <div className="merchantDropdownSelector-menu">
            <div className="merchantDropdownSelector-searchBox">
              <input
                type="text"
                placeholder="Search by Merchant Serial Number"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="merchantDropdownSelector-searchInput"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="merchantDropdownSelector-clearBtn"
                  title="Clear"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="merchantDropdownSelector-list">
              {loading ? (
                <MainAppSpinner />
              ) : merchants.length === 0 ? (
                <p>No merchants found</p>
              ) : (
                merchants.map((merchant) => (
                  <div
                    key={merchant.id}
                    className="merchantDropdownSelector-item"
                    onClick={() => handleSelect(merchant)}
                  >
                    <div className="merchantDropdownSelector-itemLeft">
                      <img
                        src={merchant.avatarUrl ? merchant.avatarUrl :placeHolder}
                        alt={merchant.username}
                        className="merchantDropdownSelector-avatarLarge"
                      />
                      <span className="merchantDropdownSelector-name">
                        {merchant.username}
                      </span>
                    </div>
                    <span className="merchantDropdownSelector-code">
                      {merchant.merchantSerialCode}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="merchantDropdownSelector-pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                ◀ Prev
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






















// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import MainAppSpinner from './MainAppSpinner';

// export default function MerchantDropdownSelector({ onSelect }) {
//   const { axiosInstance, user } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState('');
//   const [merchants, setMerchants] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedMerchant, setSelectedMerchant] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const dropdownRef = useRef(null);

//   const fetchMerchants = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       params.append('page', page - 1); // backend is zero-based
//       if (search) params.append('merchantSerialCode', search);
//       const res = await axiosInstance.get(
//         `http://localhost:9999/merchants/search?${params.toString()}`
//       );
//       setMerchants(res.data?.content || []);
//       setTotalPages(res.data?.totalPages || 1);
//     } catch (err) {
//       console.error('Failed to fetch merchants:', err);
//       setMerchants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (open) fetchMerchants();
//   }, [search, page, open]);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, []);

//   const handleSelect = (merchant) => {
//     setSelectedMerchant(merchant);
//     setSearch('');
//     onSelect && onSelect(merchant);
//     setOpen(false);
//   };

//   const handleReset = (e) => {
//     e.stopPropagation(); // prevent dropdown toggle
//     setSelectedMerchant(null);
//     setSearch('');
//     onSelect && onSelect(null);
//   };

//   return (
//     <div className='merchant-slector-block'>
//       <div className="dropdown-wrapper_users" ref={dropdownRef}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <button
//             className="dropdown-button_users"
//             onClick={() => setOpen(!open)}
//             style={{
//               flex: 1,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               minHeight: '30px',
//               padding: '10px',
//               position: 'relative',
//               width: '100%',
//             }}
//           >
//             {selectedMerchant ? (
//               <>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <img
//                     src={selectedMerchant.avatarUrl}
//                     alt={selectedMerchant.username}
//                     style={{
//                       width: '60px',
//                       height: '60px',
//                       borderRadius: '10px',
//                       objectFit: 'contain',
//                       marginRight: '10px',
//                     }}
//                   />
//                   <div style={{ display: 'flex', flexDirection: 'column' }}>
//                     <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
//                       {selectedMerchant.username}
//                     </span>
//                     <span style={{ fontSize: '14px', color: '#555' }}>
//                       {selectedMerchant.merchantSerialCode}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Reset button inside the main button */}
//                 <button
//                   onClick={handleReset}
//                   style={{
//                     marginLeft: '10px',
//                     background: 'red',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '4px 8px',
//                     fontSize: '12px',
//                     cursor: 'pointer',
//                   }}
//                   title="Reset to All Merchants"
//                 >
//                   Reset
//                 </button>
//               </>
//             ) : (
//               'All Merchants'
//             )}
//           </button>
//         </div>

//         {open && (
//           <div className="dropdown-menu_users">
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 padding: '6px 10px',
//                 marginBottom: '10px',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Search by Merchant Serial Number"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 style={{
//                   flex: 1,
//                   border: 'none',
//                   outline: 'none',
//                   fontSize: '14px',
//                 }}
//               />
//               {search && (
//                 <button
//                   onClick={() => setSearch('')}
//                   style={{
//                     background: 'transparent',
//                     border: 'none',
//                     color: '#888',
//                     fontSize: '20px',
//                     cursor: 'pointer',
//                     marginLeft: '8px',
//                   }}
//                   title="Clear"
//                 >
//                   &times;
//                 </button>
//               )}
//             </div>

//             <div className="merchant-list">
//               {loading ? (
//                 <MainAppSpinner />
//               ) : merchants.length === 0 ? (
//                 <p>No merchants found</p>
//               ) : (
//                 merchants.map((merchant) => (
//                   <div
//                     key={merchant.id}
//                     className="merchant-item-card"
//                     onClick={() => handleSelect(merchant)}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       padding: '2px 8px',
//                       border: '1px solid red',
//                       borderRadius: '10px',
//                       marginBottom: '10px',
//                       cursor: 'pointer',
//                       height: '60px',
//                       backgroundColor: '#fff',
//                     }}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <img
//                         src={merchant.avatarUrl}
//                         alt={merchant.username}
//                         style={{
//                           width: '80px',
//                           height: '60px',
//                           borderRadius: '10px',
//                           objectFit: 'contain',
//                           marginRight: '15px',
//                         }}
//                       />
//                       <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
//                         {merchant.username}
//                       </span>
//                     </div>
//                     <span style={{ color: '#666', fontSize: '14px' }}>
//                       {merchant.merchantSerialCode}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className="pagination_S">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               >
//                 ◀ Prev
//               </button>

//               <span style={{ margin: '0 10px' }}>
//                 {page} / {totalPages}
//               </span>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage((prev) => prev + 1)}
//               >
//                 Next ▶
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




















// // MerchantDropdownSelector(
// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import MainAppSpinner from './MainAppSpinner';

// export default function MerchantDropdownSelector({ onSelect }) {
//   const { axiosInstance, user } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState(user?.merchantSerialCode || '');
//   const [merchants, setMerchants] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedMerchant, setSelectedMerchant] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const dropdownRef = useRef(null);

//   const fetchMerchants = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       params.append('page', page - 1); // backend is zero-based
//       if (search) params.append('merchantSerialCode', search);

//       const res = await axiosInstance.get(`http://localhost:9999/merchants/search?${params.toString()}`);

//       console.log("Fetched merchants:=====>", res.data.content);

//       setMerchants(res.data?.content || []);
//       setTotalPages(res.data?.totalPages || 1);
//     } catch (err) {
//       console.error('Failed to fetch merchants:', err);
//       setMerchants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (open) fetchMerchants();
//   }, [search, page, open]);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, []);

//   const handleSelect = (merchant) => {

//     setSelectedMerchant(merchant);
//     onSelect && onSelect(merchant);
//     setOpen(false);
//   };

//   return (
 
// <>





//     <div className="dropdown-wrapper_users " ref={dropdownRef}>


// <button
//   className="dropdown-button_users"
//   onClick={() => setOpen(!open)}
//   style={{
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',


//     borderRadius: '8px',

//     cursor: 'pointer',
//     minHeight: '30px',
//   }}
// >
//   {selectedMerchant ? (
//     <>
//       {/* Left: avatar + username */}
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <img
//           src={selectedMerchant.avatarUrl}
//           alt={selectedMerchant.username}
//           style={{
//             width: '60px',
//             height: '60px',
//             borderRadius: '10px',
//             objectFit: 'contain',
//             marginRight: '10px'
//           }}
//         />
//         <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
//           {selectedMerchant.username}
//         </span>
//       </div>

//       {/* Right: serial number */}
//       <span style={{ fontSize: '14px', color: '#555' }}>
//         {selectedMerchant.merchantSerialCode}
//       </span>
//     </>
//   ) : (
//     'Select Merchant'
//   )}
// </button>






//       {open && (
//         <div className="dropdown-menu_users">






// <div
//   style={{
//     display: 'flex',
//     alignItems: 'center',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     padding: '6px 10px',
//     marginBottom: '10px',
//     backgroundColor: '#fff'
//   }}
// >
//   <input
//     type="text"
//     placeholder="Search by Merchant Serial Number"
//     value={search}
//     onChange={(e) => {
//       setSearch(e.target.value);
//       setPage(1);
//     }}
//     style={{
//       flex: 1,
//       border: 'none',
//       outline: 'none',
//       fontSize: '14px'
//     }}
//   />
//   {search && (
//     <button
//       onClick={() => setSearch('')}
//       style={{
//         background: 'transparent',
//         border: 'none',
//         color: '#888',
//         fontSize: '20px',
//         cursor: 'pointer',
//         marginLeft: '8px'
//       }}
//       title="Clear"
//     >
//       &times;
//     </button>
//   )}
// </div>
















//           <div className="merchant-list">
//             {loading ? (
//            <MainAppSpinner/>
//             ) : merchants.length === 0 ? (
//               <p>No merchants found</p>
//             ) : (




// merchants.map((merchant) => (
//   <div
//     key={merchant.id}
//     className="merchant-item-card"
//     onClick={() => handleSelect(merchant)}
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '2px 8px',
//       border: '1px solid red',
//       borderRadius: '10px',
//       marginBottom: '10px',
//       cursor: 'pointer',
//       height: '60px',
//       backgroundColor: '#fff'
//     }}
//   >
//     {/* Left side: avatar and username */}
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <img
//         src={merchant.avatarUrl}
//         alt={merchant.username}
//         style={{
//           width: '80px',
//           height: '60px',
//           borderRadius: '10px',
//           objectFit: 'contain',
//           marginRight: '15px'
//         }}
//       />
//       <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
//         {merchant.username}
//       </span>
//     </div>

//     {/* Right side: merchant serial code */}
//     <span style={{ color: '#666', fontSize: '14px' }}>
//       {merchant.merchantSerialCode}
//     </span>
//   </div>
// ))







//             )}
//           </div>

//           <div className="pagination_S">
          

//             <button
//               disabled={page === 1}
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             >
//               ◀ Prev
//             </button>

//             <span style={{ margin: '0 10px' }}>
//               {page} / {totalPages}
//             </span>

//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next ▶
//             </button>

         
//           </div>



          
//         </div>
//       )}
//     </div>

//     </>
//   );
// }
