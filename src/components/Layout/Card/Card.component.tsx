import React from 'react';
import { user } from '../../../App';
import './Card.css';

interface CardProps {
    user: user;
    onClick:(user: user) => void;
    isFavori: boolean
}

const Card = ({ user, onClick, isFavori }: CardProps) => {
    return (
        <li className='card' onClick={() => onClick(user)}>
            <img className='card__img' src={user.picture} alt={user.username} />
            <div style={{ display: 'flex' }}>
                <p>{user.username}</p>
                {isFavori && <p>❤️</p>}
            </div>
        </li>
    )
};

export default Card;