import { useState, useRef } from "react";
import './Canvas.css';

export default function Canvas() {
    const canvasRef = useRef(null);
    const [isErasing, setIsErasing] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [currentColor, setCurrentColor] = useState('black');
    const [lineWidth, setLineWidth] = useState(5);

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const currentX = e.nativeEvent.offsetX;
        const currentY = e.nativeEvent.offsetY;

        context.strokeStyle = isErasing ? 'white' : currentColor;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(currentX, currentY);
        context.stroke();

        setLastX(currentX);
        setLastY(currentY);
    };

    const toggleEraser = () => {
        setIsErasing((prevIsErasing) => !prevIsErasing);
        setIsDrawing(false);
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const canvasRect = canvas.getBoundingClientRect();
        setIsDrawing(true);
        setLastX(e.clientX - canvasRect.left);
        setLastY(e.clientY - canvasRect.top);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseOut = () => {
        setIsDrawing(false);
    };

    const clearBoard = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div>
            <div className="canvas-container">
                <canvas className="board"
                    ref={canvasRef}
                    width={500}
                    height={600}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseOut={handleMouseOut}
                ></canvas>
                <div className="options">
                    <button onClick={toggleEraser}>
                        {isErasing ? 'DRAW' : 'ERASE'}
                    </button>
                    <button onClick={clearBoard}>
                        CLEAR
                    </button>
                    <button onClick={clearBoard}>
                        SUBMIT!
                    </button>
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                    />
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}





