import "./QuestionForm.css";
const QuestionFroms = () => {
    return (
        <div className="questionnaire-container">
            <div className="overlay">
                <div className="questionnaire-content">
                    <h2>Just a couple of questions before creating your account</h2>
                    <p>Do you have Diabetes?</p>
                    <div className="options">
                        <label>
                            <input type="radio" name="diabetes" value="yes" />
                            Yes
                        </label>
                        <label>
                            <input type="radio" name="diabetes" value="no" />
                            No
                        </label>
                    </div>
                    <button className="next-button">Next</button>
                </div>
            </div>
        </div>
    );
};
export default QuestionFroms;
