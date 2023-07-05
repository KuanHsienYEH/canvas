import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Circle } from 'react-konva';

const Canvas = () => {
  const [image, setImage] = useState(null);
  const [commentMarkers, setCommentMarkers] = useState([]);

  useEffect(() => {
    const img = new window.Image();
    img.src = 'https://img.lovepik.com/element/40080/7463.png_300.png';
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleCanvasClick = (event) => {
    const { offsetX, offsetY } = event.evt;
    const newCommentMarker = { x: offsetX, y: offsetY };
    setCommentMarkers((prevMarkers) => [...prevMarkers, newCommentMarker]);
    // Open the comment dialog here
  };

  return (
    <Stage width={800} height={600}>
      <Layer>
        {image && (
          <Image
            image={image}
            width={800}
            height={600}
            onClick={handleCanvasClick}
          />
        )}
        {commentMarkers.map((marker, index) => (
          <Circle
            key={index}
            x={marker.x}
            y={marker.y}
            radius={5}
            fill="red"
            draggable
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
