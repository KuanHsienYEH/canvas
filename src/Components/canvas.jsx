import React, { useState } from 'react';
import { Stage, Sprite, Container, Text } from '@pixi/react';

const Canvas = () => {
  const [comments, setComments] = useState([]);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCanvasClick = (event) => {
    console.log(event.target.offsetX, event.target.offsetY)
    const { offsetX, offsetY } = event.data.getLocalPosition(event.currentTarget);
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

  const handleCommentDialogClose = () => {
    setShowCommentDialog(false);
  };

  const handleCommentContentChange = (event) => {
    const { value } = event.target;
    if (selectedImage) {
      const updatedComments = comments.map((comment) =>
        comment === selectedImage
          ? { ...comment, content: value }
          : comment
      );
      setComments(updatedComments);
    }
  };
  const handleCommentUsernameChange = (event) => {
    const { value } = event.target;
    const updatedComments = comments.map((comment) =>
      comment === selectedImage
        ? { ...comment, username: value }
        : comment
    );
    setComments(updatedComments);
  };

  const handleResolveCommentThread = () => {
    const updatedComments = comments.filter(
      (comment) => comment !== selectedImage
    );
    setComments(updatedComments);
    setSelectedImage(null);
  };

  return (
    <div>
      <Stage
        width={1200}
        height={600}
        options={{ backgroundColor: 0x000000 }}
        onClick={handleCanvasClick}
      >
        <Sprite
          image="https://placekitten.com/300/300"
          anchor={0.5}
          interactive={true}
          buttonMode={true}
          click={handleCanvasClick}
        />
        {comments.map((comment, index) => (
          <Container key={index} x={comment.x} y={comment.y}>
            <Text text={comment.content} style={{ fill: 'white' }} />
            <Text text={comment.username} style={{ fill: 'white' }} />
            <Text text={comment.time} style={{ fill: 'white' }} />
          </Container>
        ))}
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
          <button onClick={handleCommentDialogClose}>Close</button>
          <button onClick={handleResolveCommentThread}>Resolve</button>
        </div>
      )}
    </div>
  );
};

export default Canvas;
