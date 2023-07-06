import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image, Text, Group, Rect } from 'react-konva';
import Konva from 'konva';

const Canvas = () => {
  const [comments, setComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = 'https://konvajs.org/assets/yoda.jpg';
    image.onload = () => {
      imageRef.current = new Konva.Image({
        image: image,
        width: 800,
        height: 600,
      });
      layerRef.current.add(imageRef.current);
      layerRef.current.batchDraw();
    };
  }, []);

  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.evt;

    // Create a new comment marker
    const newComment = {
      x: offsetX,
      y: offsetY,
      image: selectedImage,
      content: '',
      username: '',
      time: new Date().toLocaleTimeString(),
    };

    setComments([...comments, newComment]);
    setShowCommentDialog(true);
  };

  const handleCommentContentChange = (event) => {
    const { value } = event.target;
    if (selectedImage) {
      const updatedComments = comments.map((comment) =>
        comment === selectedImage ? { ...comment, content: value } : comment
      );
      setComments(updatedComments);
    }
  };

  const handleCommentUsernameChange = (event) => {
    const { value } = event.target;
    if (selectedImage) {
      const updatedComments = comments.map((comment) =>
        comment === selectedImage ? { ...comment, username: value } : comment
      );
      setComments(updatedComments);
    }
  };

  const handleResolveCommentThread = () => {
    const updatedComments = comments.filter(
      (comment) => comment !== selectedImage
    );
    setComments(updatedComments);
    setSelectedImage(null);
  };

  const handleStageWheel = (event) => {
    event.evt.preventDefault();

    const scaleBy = 1.1;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const newScale =
      event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - (pointer.x - stage.x()) * (newScale / oldScale),
      y: pointer.y - (pointer.y - stage.y()) * (newScale / oldScale),
    };

    stage.position(newPos);
    stage.batchDraw();
  };

  const handleImageDragEnd = (event) => {
    const image = event.target;

    // Update the position of the comment marker based on the image's new position
    const updatedComments = comments.map((comment) =>
      comment.image === image ? { ...comment, x: image.x(), y: image.y() } : comment
    );
    setComments(updatedComments);
  };

  const handleImageClickSelect = (image) => {
    console.log(image)
    setSelectedImage(image);
    setShowCommentDialog(true);
  };
  return (
    <div>
      <Stage
        width={1200}
        height={800}
        draggable={true}
        onWheel={handleStageWheel}
        ref={stageRef}
      >
        <Layer ref={layerRef}>
          {/* <Image
            image={new Konva.Image({ image: imageRef.current })}
            width={800}
            height={600}
            onClick={handleImageClick}
          /> */}
          {comments.map((comment, index) => (
            <Group key={index} x={comment.x} y={comment.y} draggable={true} onDragEnd={handleImageDragEnd}>
              <Rect
                width={50}
                height={50}
                fill="red"
                opacity={0.5}
                cornerRadius={10}
                onClick={() => handleImageClickSelect(comment)}
              />
              <Text
                text={comment.content}
                fontSize={12}
                fill="white"
                offsetY={-30}
                align="center"
                width={50}
              />
              <Text
                text={comment.username}
                fontSize={12}
                fill="white"
                offsetY={-15}
                align="center"
                width={50}
              />
              <Text
                text={comment.time}
                fontSize={10}
                fill="white"
                offsetY={-5}
                align="center"
                width={50}
              />
            </Group>
          ))}
        </Layer>
      </Stage>

      {selectedImage && showCommentDialog && (
        <div>
          <textarea
            value={selectedImage.content}
            onChange={handleCommentContentChange}
          ></textarea>
          <input
            type="text"
            value={selectedImage.username}
            onChange={handleCommentUsernameChange}
          />
          <button onClick={handleResolveCommentThread}>Resolve</button>
        </div>
      )}
    </div>
  );
};

export default Canvas;
