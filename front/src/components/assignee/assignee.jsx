import React, { useState } from 'react';
import './assignee.css';

const Assignee = ({isVisible, onClose,boardMembers ,cardMembers,setCardMembers}) => {
    // const [boardMembers, setBoardMembers] = useState([
    //     { id: 1, username: 'dfaraji'},
    //     { id: 2, username: 'sahmadi'},
    //     { id: 3, username: 'arezaei'},
    //   ]);
    
    //   const [cardMembers, setCardMembers] = useState([]);

      const [searchTerm, setSearchTerm] = useState('');
    
      const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const handleAddMember = (member) => {
        if (!cardMembers.find((m) => m.id === member.id)) {
          setCardMembers([...cardMembers, member]);
        }
      };
    
      const handleRemoveMember = (member) => {
        setCardMembers(cardMembers.filter((m) => m.id !== member.id));
      };
    
      const filteredBoardMembers = boardMembers.filter((member) =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (!isVisible) return null;
    
      return (
        <div className="members">
          <div className="header">
            <h5>Members</h5>
            <button className="close-button" onClick={()=>{onClose(cardMembers)}}>X</button>
          </div>
          <input
            type="text"
            placeholder="Search members"
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="members-list">
            <h6>Board members</h6>
            {filteredBoardMembers.map((member) => (
              <div key={member.id} className="member-item" onClick={() => handleAddMember(member)}>
                <div className="member-initials">{member.username.charAt(0).toUpperCase()}</div>
                <div className="member-name">{member.username}</div>
              </div>
            ))}
          </div>
          <div className="members-list">
            <h6>Card members</h6>
            {cardMembers.map((member) => (
              <div key={member.id} className="member-item">
                <div className="member-initials">{member.username.charAt(0).toUpperCase()}</div>
                <div className="member-name">{member.username}</div>
                <button className="remove-button" onClick={() => handleRemoveMember(member)}>X</button>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Assignee;