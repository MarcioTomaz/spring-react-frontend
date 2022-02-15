import React from "react";


import Rotas from './rotas';

import NavBar from '../components/navbar';
import 'bootswatch/dist/vapor/bootstrap.css';

import 'toastr/build/toastr.min.js'

import 'toastr/build/toastr.min'

import '../custom.css';

import 'toastr/build/toastr.css';

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
