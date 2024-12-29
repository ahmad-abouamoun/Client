//a hook that returns previous state but not the latest state

import {useState} from "react";

const usePrevious = (cur) => {
    const [previous, setPrevious] = useState();
    const [current, setCurrent] = useState();
    function handlePre() {
        setPrevious(current);
        setCurrent(cur);
    }

    return {previous, handlePre};
};
export default usePrevious;
