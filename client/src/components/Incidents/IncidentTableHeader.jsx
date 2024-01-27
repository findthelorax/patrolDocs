// CustomHeader.js
import React from 'react';
import { MdAccessTime } from 'react-icons/md';

const CustomHeader = (props) => {
    const handleClick = () => {
        props.onClick();
    };

    return (
        <div>
            <span>{props.displayName}</span>
            <button onClick={handleClick}>
                <MdAccessTime />
            </button>
        </div>
    );
};

export default CustomHeader;