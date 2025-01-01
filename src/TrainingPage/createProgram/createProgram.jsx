const CreateProgram = ({show, handleClick}) => {
    return (
        show && (
            <div>
                <div className="popup-overlay">
                    <div className="popup">
                        <button onClick={() => handleClick(!show)} className="close-popup">
                            &times;
                        </button>
                        <div className="popup-content">
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default CreateProgram;
