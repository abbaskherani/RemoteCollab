import React from "react";

interface IconButtonProps {
    icon : React.ReactNode;
}

const IconButton : React.FC<IconButtonProps> = ({icon}) => {
    return (
        <button
        className="p-2 text-gray-500 hover:text-gray-700">
            {React.cloneElement(icon as React.ReactElement)}
        </button>
    );
};

export default IconButton