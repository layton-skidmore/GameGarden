import { useState, useRef } from "react";
import './Whiteboard.css';

export default function WhiteBoard() {
    const boardRef = useRef(null);
    const [isErasing, setIsErasing] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [currentColor, setCurrentColor] = useState('black'); 


    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const board = boardRef.current;
        const context = board.getContext('2d');
        const currentX = e.nativeEvent.offsetX;
        const currentY = e.nativeEvent.offsetY;

        context.strokeStyle = isErasing ? 'white' : currentColor; 
        context.lineWidth = 5;
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
        const board = boardRef.current;
        const boardRect = board.getBoundingClientRect();
        setIsDrawing(true);
        setLastX(e.clientX - boardRect.left);
        setLastY(e.clientY - boardRect.top);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseOut = () => {
        setIsDrawing(false);
    };

    const clearBoard = () => {
        const board = boardRef.current;
        const context = board.getContext('2d');
        context.clearRect(0, 0, board.width, board.height);
    };

    return (
        <div>
            <canvas className="board"
                ref={boardRef}
                width={500}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
            ></canvas>
            <div className="buttons">
                <button className="button" onClick={toggleEraser}>
                    {isErasing ? 'DRAW' : 'ERASE'}
                </button>
                <button className="button" onClick={clearBoard}>
                    CLEAR
                </button>
                <button className="button" onClick={clearBoard}>
                    SUBMIT!
                </button>
                <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                />
            </div>
        </div>
    );
}






