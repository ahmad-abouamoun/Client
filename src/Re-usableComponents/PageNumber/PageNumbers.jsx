import React from "react";
import "./PageNumber.css";

const PageNumber = ({numItems, setNumber}) => {
    const radioButtons = [];

    for (let i = 1; i <= numItems; i++) {
        radioButtons.push(
            <label key={i}>
                <input
                    type="radio"
                    name="value-radio"
                    id={`value-${i}`}
                    value={`Value ${i}`}
                    defaultChecked={i === 1}
                    onChange={() => setNumber(i)}
                />
                <span>{i}</span>
            </label>
        );
    }

    return (
        <div className="radio-input" style={{"--num_items": numItems}}>
            {radioButtons}
            <span className="selection"></span>
        </div>
    );
};

export default PageNumber;
