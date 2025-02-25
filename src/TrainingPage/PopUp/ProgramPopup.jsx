import "./Popup.css";
function ProgramPopup({showPopup, setShowPopup}) {
    return (
        showPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <button
                        className="close-popup"
                        onClick={() => {
                            setShowPopup(false);
                        }}
                    >
                        &times;
                    </button>
                    <img
                        src={`http://localhost:8000/programsImages/${showPopup.filename}`}
                        alt="Healthy Eating"
                        className="popup-image"
                    />
                    <div className="popup-content">
                        <h3>Muscle Trageted: {showPopup.name}</h3>
                        <p>
                            {showPopup.training.map((training) => (
                                <p>{training}</p>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        )
    );
}
export default ProgramPopup;
