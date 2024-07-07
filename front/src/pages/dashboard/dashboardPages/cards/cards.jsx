import React from 'react';
import { useState,useEffect } from 'react';

import './cards.css';

const Cards = () => {
    const [cardsData, setCardsData] = useState([]);


    useEffect(() => {
        const boardData = [
            {
                name: 'Sample Item 1',
                description: 'Description for item 1',
                board: 'Board A',
                dueDate: '2024-08-01',
                state: 'In Progress',
            },
            {
                name: 'Sample Item 2',
                description: 'Description for item 2',
                board: 'Board B',
                dueDate: '2024-09-15',
                state: 'Completed',
            }
        ];
        setCardsData(boardData);
      }, []);



  return (
    <>
        <div className="cards cards-container">
            <h3 className='title'>Cards</h3>
            <table className='tablestyle'>
                <thead>
                    <tr>
                        <th className='thstyle'>Name</th>
                        <th className='thstyle'>Description</th>
                        <th className='thstyle'>Board</th>
                        <th className='thstyle'>Due Date</th>
                        <th className='thstyle'>State</th>
                    </tr>
                </thead>
                <tbody>
                    {cardsData.map(item => (
                        <tr key={item.id}>
                            <td className='tdstyle'>{item.name}</td>
                            <td className='tdstyle'>{item.description}</td>
                            <td className='tdstyle'>{item.board}</td>
                            <td className='tdstyle'>{item.dueDate}</td>
                            <td className='tdstyle'>{item.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
};

export default Cards;