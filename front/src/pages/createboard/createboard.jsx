import React from 'react';
import { useEffect,useState } from 'react';
import { BsMicrosoftTeams } from "react-icons/bs";

import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { MdDescription } from "react-icons/md";

import { CiUser } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

import { FaCheck } from "react-icons/fa6";

import './createboard.css'
import { Visibility } from '@mui/icons-material';

const CreateBoard = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [searchUsers,setSearchUsers] = useState([]);
    const [teamUsers,setTeamUsers] = useState([
      { id: 0, username: 'user1' },
      { id: 1, username: 'user2' },
    ])

    const [checkVisibility,setCheckVisibility] = useState(false);


    const [users, setUsers] = useState([
      { id: 0, username: 'user1' },
      { id: 1, username: 'user2' },
      { id: 2, username: 'user3' },
      { id: 3, username: 'user4' },
      { id: 4, username: 'user5' }
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const HandleCheckVisibility = (length) => {
      if(length > 0) {
        setCheckVisibility(true);
      }
      else {
        setCheckVisibility(false);
      }
    }

    const findUserById = (username) => {
      return users.find(user => user.username === username);
    };

    const handleAddUser = (username) => {
      const userExists = users.some(user => user.username === username);
      const teamUserExist = teamUsers.some(user => user.username === username);

      if(userExists && !teamUserExist) {
        setTeamUsers([...teamUsers, findUserById(username)]);
      }
    }

    const handleRemoveUser = (username) => {
      setTeamUsers(teamUsers.filter(user => user.username !== username));
    }




    

  return (
    <>
        <div className='cboard cboard-container'>
            <form className="form" onSubmit={handleSubmit}>
                <div className="top">
                    <span className='pageName'>Create Board</span>
                    <div className="img"><BsMicrosoftTeams/></div>
                </div>
                <div className='inp-div'>
                    <div className="icon"><MdEditNote /></div>
                    <label><b>Name</b></label>
                    <input type={"text"} placeholder="Enter Board Name" name="email" onChange={(event)=>{setName(event.target.value)}}></input>
                </div>

                <div className='inp-div'>
                    <div className="icon"><MdDescription /></div>
                    <label><b>Description</b></label>
                    <input type={"text"} placeholder="Enter Description" name="email" onChange={(event)=>{setDescription(event.target.value)}}></input>
                </div>

                <div className='inp-div'>
                    <div className="icon srch-icon"><IoMdSearch /></div>
                    {checkVisibility && (
                      <div className="check-icon" onClick={()=>{handleAddUser(searchUsers)}}><FaCheck /></div>
                    )}
                    <label><b>Users</b></label> 
                    <input id="search-inp" type="search" onChange={(event)=>{setSearchUsers(event.target.value); HandleCheckVisibility((event.target.value).length);}} placeholder="Search By Username" name="email" ></input>
                </div>

                <button className='submit' type="submit">Submit</button>


                <div className='users'>
                  {teamUsers.map((item) => (
                    <div className="user-box" key={item.id}>
                      <div className="u-icon"><CiUser/></div>
                      <span className='username'>{item.username}</span>
                      <div className="rm-icon" onClick={()=>{handleRemoveUser(item.username)}}><TiDeleteOutline/></div>
                    </div>
                  ))}
                </div>
            </form>
        </div>
    </>
  );
};

export default CreateBoard;