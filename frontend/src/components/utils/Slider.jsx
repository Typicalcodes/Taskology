import React, { useState } from 'react';

const SlidingTextBoxes = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % data.length);
  };
  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="sliding-text-boxes max-w-screen-sm mx-auto mt-8">
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out transform" style={{ transform: `translateX(${-slideIndex * 100}%)` }}>
          {data.map((text, index) => (
            <div key={index} className="flex-shrink-0 w-full h-40 p-4">
              <div className="bg-white border border-gray-300 rounded p-4 h-full">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevSlide} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Prev
        </button>
        <button onClick={nextSlide} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default SlidingTextBoxes;
