import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProgressBar from "../../StoryComponents/ProgressBar";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;

const StoryViewer = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === stories?.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };
  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNextStory();
    } else if (event.key === "ArrowLeft") {
      handlePrevStory();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  return (
    <div className="relative w-full">
      <StoryViewerContainer tabIndex={0} onKeyDown={handleKeyDown}>
        <StoryImage
          src={stories?.[currentStoryIndex].image}
          alt="story image"
        />
      </StoryViewerContainer>
      <div className="absolute top-0 flex w-full">
        {stories.map((story, index) => (
          <ProgressBar
            key={index}
            duration={2000}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryViewer;
