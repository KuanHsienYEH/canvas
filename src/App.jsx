import React from 'react';
import { Stage, Sprite } from 'react-pixi';
import Canvas from './Components/canvas'

class App extends React.Component {
  render() {
    return (
      // <Stage width={800} height={600}>
      //   <Sprite
      //     image="https://placekitten.com/200/300"
      //     x={400}
      //     y={300}
      //     anchor={0.1}
      //   />
      // </Stage>
      <Canvas />
    );
  }
}

export default App;