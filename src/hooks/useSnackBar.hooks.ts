import { useEffect, useState } from 'react';

export const useSnackbar = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    
    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                setIsActive(false);
            }, 1000);
        }
    }, [isActive]);

    const openSnackBar = (msg: string) => {
        setMessage(msg)
        setIsActive(true);
    }

    return { isActive, message, openSnackBar }
}