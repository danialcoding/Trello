import React, { useState , useEffect  } from 'react';

import { useParams } from 'react-router-dom';
import { BsMicrosoftTeams } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit } from "react-icons/md";

import generateUniqueId from '../../components/functions/generateUniqueId';

import AddTask from '../../components/addtask/addtask';
import EditTask from '../../components/edittask/edittask';

import './boardpage.css'

const BoardPage = () => {
  const { boardId } = useParams();

  const [addtaskState,setAddtaskState] = useState('');


  const navigate = useNavigate();

  const teamPageMode = (boardId) => {
      return (
          navigate(`/board/team/${boardId}`, { replace: true })
      )
  }

  const handleOpenTeam = (itemId) => {
    teamPageMode(itemId);
  }



  const leaveBoardHandler = () => {

  }


  //drag & drop
  const [toDo, setToDo] = useState([
    { id: '1', name: 'Item 1',description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}},
    { id: '2', name: 'Item 2',description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}},
  ]);

  const [doing, setDoing] = useState([
    { id: '3', name: 'Item 3',description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}},
    { id: '4', name: 'Item 4',description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}},
  ]);

  const [done, setDone] = useState([
    { id: '5', name: 'Item 5',description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}},
    { id: '6', name: 'Item 6',description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}},
  ]);

    // Update server when state changes
    useEffect(() => {
        const updateServer = async () => {
            try {
            await axios.post('/api/updateBoard', { toDo, doing, done });
            } catch (error) {
            console.error('Error updating server:', error);
            }
        };

    updateServer();
    }, [toDo, doing, done]);

  const [dragZone, setDragZone] = useState('');
  const [dropZone, setDropZone] = useState('');

  const onDragStart = (e, item) => {
    e.dataTransfer.setData('card', JSON.stringify(item));
  };

  const onDrop = (e,dropZoneName,dragZoneName) => {
    const item = JSON.parse(e.dataTransfer.getData('card'));

    if(dropZoneName === dragZoneName) {
        return;
    }

    if(dropZoneName === 'todo') {
        setToDo((prev) => [...prev, item]);
    }
    else if(dropZoneName === 'doing') {
        setDoing((prev) => [...prev, item]);
    }
    else if(dropZoneName === 'done') {
        setDone((prev) => [...prev, item]);
    }

    if(dragZoneName === 'todo') {
        setToDo((prev) => prev.filter((i) => i.id !== item.id));
    }
    else if(dragZoneName === 'doing') {
        setDoing((prev) => prev.filter((i) => i.id !== item.id));
    }
    else if(dragZoneName === 'done') {
        setDone((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  //add task
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
//   const [taskName, setTaskName] = useState('');

    const showAddTaskPopup = () => {
        setIsAddTaskVisible(true);
    };

    const hideAddTaskPopup = () => {
        setIsAddTaskVisible(false);
    };




  
    const handleAddTask = (newTaskName) => {
        const id = generateUniqueId();
        const newTask = { id: id, name: newTaskName,description: '',estimate:'',duedate: '',cardImage:'',watchShown: false,taskUsers: {}};

        if(addtaskState === 'done') {
            setDone([...done,newTask]);
        }
        else if (addtaskState === 'doing') {
            setDoing([...doing,newTask]);
        }
        else {
            setToDo([...toDo,newTask]);
        }
            
    }

    //edit task
    const [isEditTaskVisible, setIsEditTaskVisible] = useState(false);
    const [state,setState] = useState();
    const [taskId,setTaskId] = useState();
    const [taskName,setTaskName] = useState();


    // const [taskName, setTaskName] = useState('');
    // const [watchShown, setWatchShown] = useState(false);
    // const [cardImage,setCardImage] = useState('');
    // const [dueDate,setDueDate] = useState('');
    // const [estimate,setEstimate] = useState('');
    // const [taskUsers,setTaskUsers] = useState([]);

    const showEditTaskPopup = (state,id,name) => {
        setState(state);
        setTaskId(id);
        setTaskName(name);
        setIsEditTaskVisible(true);
    };

    const hideEditTaskPopup = () => {
        setIsEditTaskVisible(false);
    };


    const handleEditTask = (id,state,taskName,watchShown,cardImage,dueDate,estimate,taskUsers) => {
        // let tasks;
        // if(state === 'done') {
        //     tasks = done;
        // }
        // else if (state === 'doing') {
        //     tasks = doing;
        // }
        // else {
        //     tasks = toDo;
        // }

        // const editedTask = tasks.find(task=> task.id === id);

        // editedTask
        
    }

  return (
    <>
        <div className='boardpage boardpage-container'>
            <EditTask
                state={state}
                taskId={taskId}
                gtaskName={taskName}
                isVisible={isEditTaskVisible}
                onClose={hideEditTaskPopup}
                onSave={handleEditTask}
            />
            
            <div className="top-b">
                <div className="leftside">
                    <h4 className='board-name'>Board name</h4>
                    <span className='team-btn' onClick={()=>{handleOpenTeam(boardId)}}><BsMicrosoftTeams className='team-icon'/>Team</span>
                </div>
                
                <span className='leave-btn'>
                        <a href='/boards' onClick={()=>{leaveBoardHandler()}} className='rm-btn'>Leave</a>
                </span>
            </div>

            <div className="details">
                <div className="todo parts">
                    <span className="title">To Do</span>

                    <div className="cards-box"
                        onDrop={(e) => onDrop(e, dropZone,dragZone)}
                        onDragOver={(e) => {onDragOver(e); setDropZone('todo');}}>
                        {toDo.length === 0 ? (
                            <span className='empty'>Drop items here</span>
                            ) :(
                            toDo.map((item) => (
                            <div key={item.id} className="card"
                            draggable onDragStart={(e) => {onDragStart(e, item); setDragZone('todo')}}>
                                {item.name}
                                <MdEdit className='edit-btn' onClick={()=>{showEditTaskPopup('To Do',item.id,item.name);}}/>
                            </div>
                        ))
                        )}
                    </div>

                    <div className="addcard-btn" onClick={()=>{showAddTaskPopup();setAddtaskState('todo')}}>Add a card...</div>
                </div>
                <div className="doing parts">
                    <span className="title">Doing</span>

                    <div className="cards-box"
                        onDrop={(e) => onDrop(e, dropZone,dragZone)}
                        onDragOver={(e) => {onDragOver(e); setDropZone('doing');}}>
                        {doing.length === 0 ? (
                            <span className='empty'>Drop items here</span>
                            ) :(
                            doing.map((item) => (
                            <div key={item.id} className="card"
                            draggable onDragStart={(e) => {onDragStart(e, item); setDragZone('doing')}}>
                                {item.name}
                                <MdEdit className='edit-btn' onClick={()=>{showEditTaskPopup('Doing',item.id,item.name);}}/>
                            </div>
                        ))
                        )}
                    </div>

                    <div className="addcard-btn" onClick={()=>{showAddTaskPopup();setAddtaskState('doing')}}>Add a card...</div>
                </div>
                <div className="done parts">
                    <span className="title">Done</span>

                    <div className="cards-box"
                        onDrop={(e) => onDrop(e, dropZone,dragZone)} 
                        onDragOver={(e) => {onDragOver(e); setDropZone('done');}}>
                        {done.length === 0 ? (
                            <span className='empty'>Drop items here</span>
                            ) :(
                            done.map((item) => (
                            <div key={item.id} className="card"
                            draggable onDragStart={(e) => {onDragStart(e, item); setDragZone('done')}}>
                                {item.name}
                                <MdEdit className='edit-btn' onClick={()=>{showEditTaskPopup('Done',item.id,item.name);}}/>
                            </div>
                        ))
                        )}
                    </div>

                    <div className="addcard-btn" onClick={()=>{showAddTaskPopup();setAddtaskState('done')}}>Add a card...</div>
                </div>

            </div>
            <AddTask isVisible={isAddTaskVisible}
            onClose={hideAddTaskPopup}
            onSave={handleAddTask}/>
        </div>
    </>
    
  );
};

export default BoardPage;