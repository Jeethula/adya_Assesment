import React from 'react';

function Footer() {
    
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center py-4 mt-8">
      <p>&copy; {currentYear} Your Website Name. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
