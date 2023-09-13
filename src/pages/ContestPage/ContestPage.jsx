import Canvas from "../../components/Canvas/Canvas";
import './ContestPage.css';

export default function ContestPage() {
    return (
        <div className="contest-page">
            <div className="contest-info-container">
            <h1 className="contest-title">Weekly Challenge (9/10/23-9/16/23)</h1>
                <p className="contest-description">
                    Draw the cover of Bethesda Softwork's newly released title "Starfield" to win the game for free. Only 1 winner will be selected.
                </p>
                <p className="submission-instructions">
                    To enter the contest, simply draw your "Starfield" game cover on the whiteboard below and click "Submit" when you're done.
                </p>
            </div>
            <div className="side-by-side"> 
                <img src="https://i.imgur.com/5IEdlWJ.jpg" alt="Starfield Cover" className="starfield-cover" />
                <div className='whiteboard'>
                <Canvas />
                </div>
            </div>
            
        </div>
    );
}
