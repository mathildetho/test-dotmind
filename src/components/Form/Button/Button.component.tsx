import React from 'react';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
    return (
        <button className='button'>
            {text}
        </button>
    )
};

export default Button;