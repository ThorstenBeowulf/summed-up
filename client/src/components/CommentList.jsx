import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_COMMENT, EDIT_COMMENT } from '../utils/mutations';
import { GET_COMMENTS } from '../utils/queries'; 
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CommentCard = styled.div`
  background: #fff;
  padding: 0.5rem 0;
  margin: 1rem 3rem 0;
  border: none;

  .comment-details {
    display: flex;
    justify-content: space-between;
  }

  .card-body {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 0 1rem;
  }
`;

function CommentList({ postId }) {
//   const { loading, error, data } = useQuery(GET_COMMENTS, {
//     variables: { postId },
//   });

//   if (loading) {
//     return <p>Loading comments...</p>;
//   }

//   if (error) {
//     console.error('Error fetching comments:', error);
//     return <p>Error loading comments.</p>;
//   }

//   const comments = data.comments; 



  const placeholderComments = [
    {
      _id: 'comment1',
      user: {
        username: 'user 1',
      },
      text: 'This is a placeholder comment 1.',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'comment2',
      user: {
        username: 'user 2',
      },
      text: 'This is a placeholder comment 2.',
      createdAt: new Date().toISOString(),
    },
  ];

  const commentButtonStyle = {
    background: 'none',
    color: 'grey',
    border: 'none',
    padding: '1rem 2rem 1rem 0',
    cursor: 'pointer',
  };


  return (
    <div>
      <h4 className='my-3'><strong>comments</strong></h4>
      {/* <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.user.username}</strong>: {comment.text}
            <br />
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul> */}

<Container>
        {placeholderComments.map((comment) => (
          <CommentCard key={comment._id}>
            <div className="comment-details">
              <strong>{comment.user.username}</strong>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
            
            <div className="card-body">{comment.text}
            <br/>
            <button onClick={() => handleEditPost(post._id)} style={commentButtonStyle}>
  <FontAwesomeIcon icon={faEdit} /> Edit
</button>
<button onClick={() => handleDeletePost(post._id)} style={commentButtonStyle}>
  <FontAwesomeIcon icon={faTrash} /> Delete
</button>
</div>
          </CommentCard>
        ))}
      </Container>

    </div>
  );
  
}

export default CommentList;
