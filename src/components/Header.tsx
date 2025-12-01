import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/aclc-20logo.png" alt="ACLC Logo" className="logo" />
        <div className="title-container">
          <h1>CSO Clearance Payment</h1>
          <p>ACLC College of Mandaue</p>
        </div>
        <img src="/cso-logo.png" alt="CSO Logo" className="logo" />
      </div>
    </header>
  );
};
