import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS_BY_CATEGORY } from "../utils/queries";
import styled from "styled-components";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare } from '@fortawesome/free-solid-svg-icons';

const CategoryPostContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 0 !important;
  }
`;

function CategoryPage({ selectedCategory }) {
  //   const { loading, error, data } = useQuery(GET_POSTS_BY_CATEGORY, {
  //     variables: { category: selectedCategory },
  //   });

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;

  //   const posts = data.postsByCategory;

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const cardStyle = {
    background: "#fff",
    padding: "0.5rem 0",
    margin: "1rem 0",
    border: "none",
  };

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const cardTextStyle = {
    fontSize: "1rem",
    marginTop: "1rem",
  };

  const cardBodyStyle = {
    borderBottom: "1px solid #ddd",
    padding: "1rem 0",
  };

  const commentButtonStyle = {
    background: 'none',
    color: 'grey',
    border: 'none',
    padding: '1rem 2rem 1rem 0',
    cursor: 'pointer',
  };

  const handleCommentButtonClick = (postId) => {
    return (
      <Link to={`/posts/${postId}`}>View Post</Link>
    );
  }

  const [postLink, setPostLink] = useState(""); 

  const handleShareButtonClick = (postId) => {
    const postLink = `https://lit-scrubland-56813-23b87facb8d8.herokuapp.com/post/${postId}`;

    const inputElement = document.createElement('input');
    inputElement.value = postLink;

    document.body.appendChild(inputElement);

    inputElement.select();
    document.execCommand('copy');

    document.body.removeChild(inputElement);

handleShowModal()
setPostLink(postLink);

  };


  const [category, setCategory] = useState({
    name: "Technology",
    posts: [
      {
        _id: "1",
        title: "Tech Post 1",
        content: "This is a tech post content.",
        createdAt: new Date().toISOString(),
        comments: [
          {
            _id: "comment1",
            content: "This is a sample comment on the tech post.",
            createdAt: new Date().toISOString(),
            user: {
              username: "Alice",
            },
          },
        ],
      },
      {
        _id: "2",
        title: "Tech Post 2",
        content: "Another tech post content.",
        createdAt: new Date().toISOString(),
        comments: [
          {
            _id: "comment2",
            content: "Another sample comment on the tech post.",
            createdAt: new Date().toISOString(),
            user: {
              username: "Bob",
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="py-5">
      <CategoryPostContainer style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
        <h1 style={{ paddingBottom: "1rem", textAlign: "end" }}>
          {category.name}
        </h1>

        {category.posts.map((post) => (
          <div className="card" key={post._id} style={cardStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <p className="card-text">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <Link
                to={`/posts/${post._id}`}
                className="card-title"
                style={cardTitleStyle}
              >
                {post.title}
              </Link>
              <p className="card-text" style={cardTextStyle}>
                {post.content}
              </p>
              <button onClick={() => handleCommentButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faComment} />  {post.comments ? post.comments.length : 0}
              </button>
              <button onClick={() => handleShareButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>
          </div>
        ))}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>share this post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Link copied to clipboard: {postLink}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </CategoryPostContainer>
    </div>
  );
}

export default CategoryPage;
