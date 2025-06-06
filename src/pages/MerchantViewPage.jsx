
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import  placeHolder  from '../assets/images/placeHolder.png';




import {
  FaEnvelope, FaMapMarkerAlt, FaStore, FaCheckCircle, FaCalendarAlt,
  FaIdCard, FaEuroSign, FaReceipt, FaClock, FaCreditCard,
  FaMoneyCheckAlt, FaRegThumbsUp, FaUserCircle
} from 'react-icons/fa';
import MainAppSpinner from '../components/MainAppSpinner';
import BackButton from '../components/BackButton';

function MerchantViewPage() {
  const { axiosInstance } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`merchants/viewmerchant/${id}`);
        setUserData(response.data);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="profile_v2-spinner-wrapper"><MainAppSpinner /></div>;
  if (!userData) return <div className="profile_v2-error-message">Failed to load profile.</div>;

  return (


<>


 


      
<BackButton to="/merchants" label="Back to Merchants" />
        <div className="profile_v2-info">
             <div className="profile_v2-usercard">
          <img src={userData.avatar ? userData.avatar:placeHolder} alt="User Avatar" className="profile_v2-avatar" />
          <h4 className="profile_v2-name">{userData.username?.toUpperCase()}</h4>
        </div>

          <h4 className="profile_v2-section-title">Profile</h4>
          <div><FaUserCircle className="profile_v2-icon" /> Username: {userData.username}</div>
          <div><FaEnvelope className="profile_v2-icon" /> Email: {userData.email}</div>
          <div><FaMapMarkerAlt className="profile_v2-icon" /> Address: {userData.address}, {userData.city}, {userData.zip}, {userData.country}</div>
          <div><FaCalendarAlt className="profile_v2-icon" /> Created At: {userData.createdAt}</div>
     


  <h4 className="profile_v2-section-title">Account</h4>
  <div className="profile_v2-line">
    <FaStore className="profile_v2-icon" /> <strong>Merchant #:</strong> {userData.merchantSerialCode}
  </div>
  <div className="profile_v2-line">
    <FaCheckCircle className="profile_v2-icon" /> <strong>Status:</strong> {userData.merchantStatus}
  </div>


{/* Subscription Card */}

 <h4 className="profile_v2-section-title">Subscription</h4>
{userData.elavonSubscriptions && userData.elavonSubscriptions.length > 0 ? (
  userData.elavonSubscriptions.map((sub, idx) => (
    <div key={idx}>
      <div className="profile_v2-line">
        <FaIdCard className="profile_v2-icon" /> <strong>Plan:</strong> {sub.planName}
      </div>
      <div className="profile_v2-line">
        <FaEuroSign className="profile_v2-icon" /> <strong>{sub.planBillingCycle}</strong> - ${sub.planPrice}
      </div>
      <div className="profile_v2-line">
        <FaCheckCircle className="profile_v2-icon" /> <strong>Status:</strong> {sub.subscrptionStatus}
      </div>
      <div className="profile_v2-line">
        <FaClock className="profile_v2-icon" /> <strong>Next Billing:</strong> {sub.subscrptionNextBillingDate}
      </div>
    </div>
  ))
) : (
  <div className="profile_v2-line">No active subscriptions.</div>
)}



<h4 className="profile_v2-section-title">Payment</h4>
{userData.elavonSubscriptions?.some(sub => sub.lastPayment) ? (
  userData.elavonSubscriptions.map((sub, idx) =>
    sub.lastPayment ? (
      <div key={idx}>
        <div className="profile_v2-line">
          <FaReceipt className="profile_v2-icon" /> <strong>Payment ID:</strong> {sub.lastPayment.sslTxnId}
        </div>
        <div className="profile_v2-line">
          <FaMoneyCheckAlt className="profile_v2-icon" /> <strong>Amount:</strong> ${sub.lastPayment.sslAmount}
        </div>
        <div className="profile_v2-line">
          <FaRegThumbsUp className="profile_v2-icon" /> <strong>Result:</strong> {sub.lastPayment.sslResult}
        </div>
        <div className="profile_v2-line">
          <FaClock className="profile_v2-icon" /> <strong>Time:</strong> {sub.lastPayment.sslTxnTime}
        </div>
      </div>
    ) : null
  )
) : (
  <div className="profile_v2-line">No payment history available.</div>
)}


      
 <h4 className="profile_v2-section-title">Devices</h4>
{Array.isArray(userData.devices) && userData.devices.length > 0 && userData.devices.some(dev => dev.serialNumber) ? (
  userData.devices.map((dev, idx) => (
    <div key={idx} className="profile_v2-device">
      {dev.serialNumber ? (
        <>
          <div><FaCreditCard className="profile_v2-icon" /> Serial Number: {dev.serialNumber}</div>
          <div style={{ paddingLeft: '24px' }}>Provider: {dev.provider || 'N/A'}</div>
          <div style={{ paddingLeft: '24px' }}>Model: {dev.model || 'N/A'}</div>
          <div style={{ paddingLeft: '24px' }}>Status: {dev.status || 'N/A'}</div>
          <hr />
        </>
      ) : null}
    </div>
  ))
) : (
  <div className="profile_v2-line">No devices assigned to this merchant.</div>
)}












        </div>

    
   

    </>
  );
}

export default MerchantViewPage;