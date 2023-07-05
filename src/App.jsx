import React from 'react';
import Canvas from './Components/canvas'
import Pannel from './Components/pannel'

class App extends React.Component {
  render() {
    return (
      <>
        <Canvas />
        <Pannel />
      </>
    );
  }
}

export default App;