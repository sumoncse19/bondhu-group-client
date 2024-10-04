"use client";
import React, { useEffect, useRef } from "react";

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // for 1st level
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D; // Type for 2D context

      // Drawing the line
      ctx.beginPath();
      ctx.moveTo(500, 10); // start
      ctx.lineTo(500, 50); // first line  break
      ctx.moveTo(500, 50);
      ctx.lineTo(300, 50); //left side move
      ctx.lineTo(700, 50); // right side move

      // left to down
      ctx.moveTo(300, 50);
      ctx.lineTo(300, 100);

      // right to down
      ctx.moveTo(700, 50);
      ctx.lineTo(700, 100);

      ctx.strokeStyle = "#00f";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }, []);
  return (
    <div className="w-full h-[100vh]">
      <div className="w-full h-full flex flex-col  items-center relative bg-red-400">
        <div className="w-[70%] mx-auto bg-red-950 flex justify-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-black"
            src="/images/profilePicIcon.png"
            alt=""
          />
        </div>

        {/* tree */}
        <div className="pl-10 w-[70%] mx-auto flex justify-center bg-red-600">
          <img src="/images/tree.png" alt="" />
        </div>

        <div className="w-[70%] mx-auto flex justify-between bg-blue-400">
          <div className="w-1/2 flex flex-col items-center -ml-8">
            <img
              className="w-24 h-24 rounded-full border-4 border-black"
              src="/images/profilePicIcon.png"
              alt=""
            />
            {/* tree */}
            <div className="pl-3 w-[70%] mx-auto flex justify-center bg-red-600">
              <img src="/images/tree.png" alt="" />
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-center -mr-8">
            <img
              className="w-24 h-24 rounded-full border-4 border-black"
              src="/images/profilePicIcon.png"
              alt=""
            />
            {/* tree */}
            <div className="pl-4 w-[70%] mx-auto flex justify-center bg-red-600">
              <img src="/images/tree.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

{
  /* <canvas
          ref={canvasRef}
          width={1000}
          height={110}
          // style={{ border: "1px solid #000" }}
        /> */
}
