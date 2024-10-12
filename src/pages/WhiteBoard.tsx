import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [isEraser, setIsEraser] = useState(false);
  const [brushSize, setBrushSize] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = brushSize;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [brushSize]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(event);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      context.beginPath();
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in event ? event.clientX : event.touches[0].clientX) - rect.left;
    const y = ('clientY' in event ? event.clientY : event.touches[0].clientY) - rect.top;

    context.strokeStyle = isEraser ? '#FFFFFF' : color;
    context.lineWidth = brushSize;
    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    startDrawing({ clientX: touch.clientX, clientY: touch.clientY } as React.MouseEvent<HTMLCanvasElement>);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    draw({ clientX: touch.clientX, clientY: touch.clientY } as React.MouseEvent<HTMLCanvasElement>);
  };

  const increaseBrushSize = () => {
    setBrushSize(prevSize => Math.min(prevSize + 1, 20));
  };

  const decreaseBrushSize = () => {
    setBrushSize(prevSize => Math.max(prevSize - 1, 1));
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Simple Whiteboard</h1>
      <div className="mb-4 flex flex-wrap justify-center gap-2 w-full max-w-md sm:max-w-none">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-20 border-none rounded cursor-pointer"
          title="Choose color"
        />
        <Button
          onClick={() => setIsEraser(!isEraser)}
          variant={isEraser ? "default" : "outline"}
        >
          {isEraser ? 'Draw' : 'Erase'}
        </Button>
        <Button
          onClick={clearCanvas}
          variant="destructive"
        >
          Clear All
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            onClick={decreaseBrushSize}
            variant="outline"
            size="icon"
            disabled={brushSize <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{brushSize}px</span>
          <Button
            onClick={increaseBrushSize}
            variant="outline"
            size="icon"
            disabled={brushSize >= 20}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDrawing}
        className="border border-gray-300 rounded-lg bg-white shadow-lg w-full max-w-3xl h-[60vh]"
      />
    </div>
  );
};

export default Whiteboard;