import React from 'react';
import MenuButton from '../components/MenuButton/MenuButton';

function Contact (){
    return (
    <div>
      <MenuButton/>   
      <div className="contact-container">
        <h1>Say Hi !</h1>
        <h3>I love making visuals with data</h3>
        <p> hi @ fretzcastano.com </p>
        <p>
          <a  className="contact-containe-a" href="https://github.com/kukovisuals">www.github.com/kukovisuals</a>
        </p>
      </div>
    </div>
   
  )
}

export default Contact;