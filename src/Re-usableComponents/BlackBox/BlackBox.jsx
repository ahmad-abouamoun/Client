import "./BlackBox.css";

const BlackBox = ({children}) => {
    return (
        <div>
            <div className="blackBox">{children}</div>
        </div>
    );
};
export default BlackBox;
