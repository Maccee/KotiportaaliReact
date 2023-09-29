import React from 'react';

function LoginStatus({ isAuthenticated, username }) {
  return (
    <div className={`loginstuff ${isAuthenticated ? "isAuthenticated" : ""}`}>
      Logged in as {username}!
    </div>
  );
}

export default LoginStatus;