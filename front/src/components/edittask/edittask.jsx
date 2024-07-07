import React, { useState } from 'react';
import './edittask.css';

import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdCard } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineTextSnippet } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiShow,BiHide } from 'react-icons/bi';
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { MdOutlineComment } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";

import DueDate from '../duedate/duedate';
import Estimate from '../estimate/estimate';
import Assignee from '../assignee/assignee';
import CommentBox from '../commentbox/commentbox';
import UploadImage from '../uploadimage/uploadimage';
import SubTask from '../subtask/subtask';

import generateUniqueId from '../functions/generateUniqueId';
import getCurrentFormattedTimestamp from '../functions/getCurrentFormattedTimestamp'


const EditTask = ({state, taskId ,gtaskName, isVisible, onClose, onSave }) => {
  const [taskName, setTaskName] = useState(gtaskName);
  const [taskNameValue, setTaskNameValue] = useState(taskName);
  const [description, setDescription] = useState('');
  const [watchShown, setWatchShown] = useState(false);
  const [cardImage,setCardImage] = useState('https://image.cdn2.seaart.ai/2023-08-29/15718937463421957/88f59dbdc859df9c163af54045e46db58a68ad94_high.webp');

  const [dueDate,setDueDate] = useState('');
  
  const [estimate,setEstimate] = useState('');

  const [teamUsers,setTeamUsers] = useState([
    { id: 0, username: 'user1' },
    { id: 1, username: 'user2' },
    { id: 2, username: 'user3' },
    { id: 3, username: 'user4' },
  ]);

  const [taskUsers,setTaskUsers] = useState([
    { id: 0, username: 'user1' },
    { id: 1, username: 'user2' },
  ]);

  const [comments,setComments] = useState([]);



  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  ///////
  const handleSaveAndClose = () => {
    handleSaveTaskName(taskNameValue);
    onSave(taskName);
    onClose();
  };

  const toggleWatch = () => {
    setWatchShown(!watchShown);
  };

  const handleRemoveUser = (username) => {
    setTaskUsers(taskUsers.filter(user => user.username !== username));
  }
  

  const handleSaveTaskName = (value) => {
    if(value !== '') {
      setTaskName(value);
    }
  };

  //due date
  const [isDueDateVisible, setIsDueDateVisible] = useState(false);

  const handleDueDate = (date) => {
    setDueDate(date);
    setIsDueDateVisible(false);
  }

  const showDueDatePopup = () => {
    setIsDueDateVisible(true);
  };

const hideDueDatePopup = () => {
    setIsDueDateVisible(false);
  };


  //estimate 
  const [isEstimateVisible, setIsEstimateVisible] = useState(false);

  const handleEstimate = (estimate) => {
    setEstimate(estimate);
    setIsEstimateVisible(false);
  }

  const handleEstimateRemove = () => {
    setEstimate('');
    setIsEstimateVisible(false);
  }

  const showEstimatePopup = () => {
    setIsEstimateVisible(true);
  };

const hideEstimatePopup = () => {
  setIsEstimateVisible(false);
  };

  //members
  const [isAssigneeVisible, setIsAssigneeVisible] = useState(false);

  const handleAssignee = (cardMembers) => {
    setTaskUsers(cardMembers);
    hideAssigneePopup();
  }

  const showAssigneePopup = () => {
    setIsAssigneeVisible(true);
  };

  const hideAssigneePopup = () => {
    setIsAssigneeVisible(false);
  };


  //comments
  const [newComment, setNewComment] = useState({ id: -1, username: '',message: '',timestamp:''});

  const handleCommentChange = (msg) => {
    const timestamp = getCurrentFormattedTimestamp();
    const id = generateUniqueId();
    setNewComment({ id: id, username: 'user2',message: msg,timestamp:timestamp});

  }
  const handleCommentSave = () => {
    const timestamp = getCurrentFormattedTimestamp();
    const id = generateUniqueId();
    setNewComment({...newComment, id: id,timestamp: timestamp});
    setComments([...comments, newComment]);
    setNewComment({ id: -1, username: '',message: '',timestamp:''});
  }


  //upload image
  const [isUploadImageVisible, setIsUploadImageVisible] = useState(false);

  const showUploadImagePopup = () => {
    setIsUploadImageVisible(true);
  };

  const hideUploadImagePopup = () => {
    setIsUploadImageVisible(false);
  };

  const handleSetImage = (img) => {
    setCardImage(img);
    hideUploadImagePopup();
  };

  if (!isVisible) return null;

  return (
    <div className="edit-task edit-task-container">
      <DueDate
        isVisible={isDueDateVisible}
        onClose={hideDueDatePopup}
        onSave={handleDueDate}
      />

      <Estimate
        isVisible={isEstimateVisible}
        onClose={hideEstimatePopup}
        onSave={handleEstimate}
        onRemove={handleEstimateRemove}
      />

      <Assignee
        isVisible={isAssigneeVisible}
        onClose={handleAssignee}
        boardMembers={teamUsers}
        cardMembers={taskUsers}
        setCardMembers={setTaskUsers}
      />

      <UploadImage
        isVisible={isUploadImageVisible}
        onSave={handleSetImage}
      />

      


      <div className='top'>
        <IoClose className='close-btn' onClick={handleSaveAndClose}/>
        <img src={cardImage}
        alt='description' className='top-img'
        />
      </div>
      
      <div className="rightside">
        <span className='title'>Add To Card</span>
        <div className="card" onClick={showAssigneePopup}>
          <FaRegUser className='icon'/>
          <span className='title'>Members</span>
        </div>

        <div className="card" onClick={showDueDatePopup}>
          <MdOutlineDateRange className='icon'/>
          <span className='title'>Due Date</span>
        </div>

        <div className="card" onClick={showEstimatePopup}>
          <VscDebugBreakpointDataUnverified className='icon'/>
          <span className='title'>Estimate</span>
        </div>

        <div className="card" onClick={()=>{setIsUploadImageVisible(!isUploadImageVisible)}}>
          <BsImage className='icon'/>
          <span className='title'>Upload Image</span>
        </div>


      </div>


      <div className="leftside form">
        <div className="taskname">
          
          <div className='inp-div'>
            <IoMdCard className="icon"/>
            <input type={"text"} onBlur={(e)=>{handleSaveTaskName(e.target.value)}} value={gtaskName} onChange={(e)=>{setTaskNameValue(e.target.value)}} placeholder="Enter Board Name" name="email"></input>
          </div>
          <span className='listname'>In list: {state}</span>
        </div>

        <div className='member-div'>
          <div className="header">
              <FaRegUser className='icon'/>
              <span className='title'>Members</span>
          </div>

          <div className='users'>
            {taskUsers.length === 0 ? <span>There is no user</span> :
              taskUsers.map((item) => (
              <div className="user-box" key={item.id}>
                <div className="u-icon"><CiUser/></div>
                <span className='username'>{item.username}</span>
                <div className="rm-icon" onClick={()=>{handleRemoveUser(item.username)}}><TiDeleteOutline/></div>
              </div>
            ))}
          </div>
        </div>

        <div className='watch-div'>
          <div className="header">
            <IoIosNotificationsOutline className="icon"/>
            <span className='title'>Notifications</span>
          </div>

          <div className="notif-btn" onClick={toggleWatch}>
            {!watchShown ? <BiShow/> : <BiHide/>}Watch
          </div>
        </div>


        {estimate !== '' ? 
        (<div className='estimate-div'>
          <div className="header">
            <VscDebugBreakpointLogUnverified className="icon"/>
            <span className='title'>Estimate</span>
          </div>

          <div className="estimate-btn">
            <VscDebugBreakpointDataUnverified className="icon-btn"/>
            {estimate}
          </div>
        </div>) : (<></>)}



        {dueDate !== '' ? 
        (<div className='duedate-div'>
          <div className="header">
            <MdOutlineDateRange className="icon"/>
            <span className='title'>Due Date</span>
          </div>

          <div className="duedate-btn">
            {dueDate}
          </div>
        </div>) : (<></>)}
        

        <div className="description">
          <div className="header">
            <MdOutlineTextSnippet className="icon"/>
            <span className='title'>Description</span>
          </div>
          
          <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} onBlur={(e)=>{setDescription(e.target.value)}}
            placeholder="Enter your description..."
            rows="5"
            cols="40"
            className='inp'
          />
        </div>

        <SubTask/>


        <div className="comments">
          <div className="header">
            <MdOutlineComment className="icon"/>
            <span className='title'>Comments</span>
          </div>
          
          <input type={"text"} value={newComment.message}
          onChange={(e)=>{handleCommentChange(e.target.value)}} placeholder="Write a comment..." name="email"></input>

          <div className="commentsave-btn" onClick={handleCommentSave}>Save</div>

          <CommentBox
            comments={comments}
            setComments={setComments}
          />
        </div>

          

        

        {/* <div className="Comment">
          <div className="header">
            <MdOutlineTextSnippet className="icon"/>
            <span className='title'>Description</span>
          </div>
          
          <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} onBlur={(e)=>{setDescription(e.target.value)}}
            placeholder="Enter your description..."
            rows="5"
            cols="40"
            className='inp'
          />
        </div> */}
      </div>
    </div>
  );
};

export default EditTask;
