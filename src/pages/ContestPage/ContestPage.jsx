import WhiteBoard from "../../components/Whiteboard/Whiteboard";

export default function ContestPage() {
    return (
        <div className="contest-page">
            <h1 className="contest-title">Draw Your Favorite Video Game Cover</h1>
            <p className="contest-description">
                Unleash your creativity and design your dream video game cover! Showcase your artistic skills for a chance to win big.
            </p>
            <div className='whiteboard'>
                <WhiteBoard />
            </div>
            <p className="prize-description">
                The best submission will win <span className="prize">10 FREE Games!</span>
            </p>
            <p className="submission-instructions">
                To enter the contest, simply draw your game cover on the whiteboard above and click "Submit" when you're done.
            </p>
            <button className="submit-button">Submit</button>
        </div>
    );
}