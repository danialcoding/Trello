import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './team.css'

const Team = () => {
  const [teamData, setTeamData] = useState([]);
  const [userRole,setUserRole] = useState('admin');


  useEffect(() => {
      const boardData = [
          {
              id: 1,
              username: 'mmad',
              role: 'user',
          },
          {
              id: 2,
              username: 'danial',
              role: 'admin',
          }
      ];
      setTeamData(boardData);
    }, []);



  return (
    <>
      <div className='team-table-container team-table'>
        <h4 className='title'>Team</h4>
        <h5 className='board-name'>Board Name: Board1</h5>


        <table className='tablestyle'>
                <thead>
                    <tr>
                        <th className='thstyle'>ID</th>
                        <th className='thstyle'>Username</th>
                        <th className='thstyle'>Role</th>
                        <th className='thstyle'>KIck</th>
                    </tr>
                </thead>
                <tbody>
                    {teamData.map(item => (
                        <tr key={item.id}>
                            <td className='tdstyle'>{item.id}</td>
                            <td className='tdstyle'>{item.username}</td>
                            <td className='tdstyle'>{item.role}</td>
                            <td className='tdstyle'>
                              {userRole == "admin" && 
                                <div className='btn-box'>
                                  <div className="rm-btn">Remove</div>
                                  {item.role == "admin" &&
                                    <>
                                      <div className="us-btn">Demote To User</div>
                                    </>
                                  }
                                  {item.role == "user" &&
                                    <>
                                      <div className="ad-btn">Promote To Admin</div>
                                    </>
                                  }
                                </div>
                              }
                              {userRole == "user" && 
                                <p>You Haven't Access</p>
                              }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
      </div>
    </>
    
  );
};

export default Team;