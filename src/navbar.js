import React from 'react';
import './navbar.css'; // Import your CSS file

const TopNavigation = () => {
  return (
    <div className="topnav">
      <a className="active" href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  );
};

const Content = () => {
  return (
    <div style={{ paddingLeft: '16px' }}>
      <h2>Top Navigation Example</h2>
      <p>Some content..</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <TopNavigation />
      <Content />
    </div>
  );
};

export default App;
