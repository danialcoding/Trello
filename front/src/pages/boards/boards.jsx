import React from 'react';
import { useState,useEffect } from 'react';
import { MdDashboard } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import './boards.css'
import { Description } from '@mui/icons-material';

const items = [
  {
      title: 'Boards',
      icon: <MdDashboard />,
      path: '/boards'
  },
];



const Boards = () => {
  const [boardsItem, setBoardsItem] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:8080/workspaces', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });


      const result = await response.json();

      if (!response.ok) {
        
      }
  }



  // //test
  useEffect(() => {
    const boardData = [
      {
        id: 1,
        name: 'test board',
        description: 'test disc',
      },
      {
        id: 2,
        name: 'test board2',
        description: 'test disc2',
      },
      {
        id: 3,
        name: 'test board3',
        description: 'test disc3',
      },
      {
        id: 4,
        name: 'test board4',
        description: 'test disc4',
      },
      {
        id: 5,
        name: 'test board5',
        description: 'test disc5',
      }
    ];
    setBoardsItem(boardData);
  }, []);




  const navigate = useNavigate();

  const boardMode = (boardId) => {
      return (
          navigate(`/board/${boardId}`, { replace: true })
      )
  }

  const handleShowCard = (itemId) => {
    boardMode(itemId);
  }



  return (
    <>
      <div className='boards boards-container'>
        <div className="leftside">
          {
            items.map((item) => {
              return(
                <>
                <span className='item-icon'>
                  {item.icon}
                </span>
                <a href={item.path} className='leftside-item' key={item.id}>{item.title}</a>
                </>
              ) 
            })
          }
        </div>
        <div className="rightside">
          <h3 className='title'>Workspaces</h3>

          <div className="boards-div">
            {
              boardsItem.map((item) => {
                return(
                  //put on click for board
                  <div className='board-card' key={item.id}>
                    <span className='board-title' onClick={() => {handleShowCard(item.id)}} >{item.name}</span>

                    <span
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='board-settings-icon'><BsThreeDotsVertical /></span>
                    <Menu
                      id="basic-menu"
                      className='popup-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Remove</MenuItem>
                    </Menu>
                  </div>
                ) 
              })
            }
          </div>
        </div>
      </div>
    </>
    
  );
};

export default Boards;