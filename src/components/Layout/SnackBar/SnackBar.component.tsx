import React from 'react';
import './SnackBar.css'

interface SnackBarProps {
    message: string;
    isActive: boolean
}
const SnackBar = ({ message, isActive }: SnackBarProps) => {
    return (
        <div
            className={`snackbar snackbar${isActive ? '--open' : '--remove'}`}
        >
            <p>{message}</p>
        </div>
    )
};

export default SnackBar;