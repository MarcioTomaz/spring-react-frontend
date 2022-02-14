import React from "react";

import '../custom.css';

import Rotas from './rotas';

import NavBar from '../components/navbar';

import 'bootswatch/dist/vapor/bootstrap.css'

class App extends React.Component {

  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )
  }
}

export default App;
