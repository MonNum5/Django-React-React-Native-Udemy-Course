import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/header';
import Footer from './components/footer';
import Numbers from './components/numbers';

let createAlert = () => {
    alert('You clicked me')
  }

let ShowMessage = (props) => {

  if (props.toShow){
    return <h2>My message</h2>
  }
  else {
    return <h2>Not true</h2>
  }
  
}

const pStyle = {
  fontSize: '2em',
  color:'red'
}



function App() {
  return (
    <div className="App">
      <Header info="This is my message" myNumber='5'/>
        <p style={pStyle}> main content </p>
      <Footer myAlert={createAlert} trademark='page by Clemens'/>
      <ShowMessage toShow ={true} />
      <Numbers />
    </div>
  );
}

export default App;
