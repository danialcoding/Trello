import React, { useState } from 'react';
import './commentbox.css';

import getCurrentFormattedTimestamp from '../functions/getCurrentFormattedTimestamp';

const CommentBox = ({comments,setComments}) => {
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState('');
  
    const handleDeleteComment = (id) => {
      setComments(comments.filter(comment => comment.id !== id));
    };
  
    const handleEditComment = (id, text) => {
      setEditCommentId(id);
      setEditText(text);
    };
  
    const handleUpdateComment = (id) => {
      const timestamp = getCurrentFormattedTimestamp();
      
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, message: editText,timestamp: timestamp } : comment
      ));

      setEditCommentId(null);
      setEditText('');
    };

  
    return (
      <div className="comment-box">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <div className="comment-initials">{comment.username.charAt(0).toUpperCase()}</div>
              <div className="comment-details">
                <span className="comment-name">{comment.username}</span>
                <span className="comment-timestamp">{comment.timestamp}</span>
              </div>
            </div>
            {editCommentId === comment.id ? (
              <div className="comment-edit-box">
                <textarea className='inp'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className='save-btn' onClick={() => handleUpdateComment(comment.id)}>Save</button>
              </div>
            ) : (
              <div className="comment-text">{comment.message}</div>
            )}
            <div className="comment-actions">
              <span className="comment-edit" onClick={() => handleEditComment(comment.id, comment.message)}>Edit</span>
              <span className="comment-delete" onClick={() => handleDeleteComment(comment.id)}>Delete</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default CommentBox;
