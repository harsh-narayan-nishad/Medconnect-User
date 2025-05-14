import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';

const UserProfileDetails = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(JSON.parse(storedUser).fullname);
    }

  }, []);

  return (
    <StyledWrapper>
      <div className="wrapper">
      <div className="card-client">
        <div className="user-picture">
          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
          </svg>
        </div>
        <p className="name-client">             {userName ? userName : "User Name"} {/* Show user's name */}

          <span>

          </span>
        </p>
   
      </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

  .wrapper {
    display: flex;
    justify-content: center; /* Centers the card horizontally */
    align-items: center; /* Optional: Centers it vertically */
    

   
  }
  .card-client {
    // background: #2cb5a0;
    width: auto;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 20px;
    padding-right: 20px;
    // border: 4px solid #7cdacc;
    // box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
    border-radius: 10px;
    text-align: center;
    color: #000;
    font-family: "Poppins", sans-serif;
    transition: all 0.3s ease;
  }

  .user-picture {
    overflow: hidden;
    object-fit: cover;
    width: 5rem;
    height: 5rem;
    border: 1px solid black;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .user-picture svg {
    width: 2.5rem;
    fill: currentColor;
  }

  .name-client {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 18px;
  }

  .name-client span {
    display: block;
    font-weight: 200;
    font-size: 16px;
  }
    `;

export default UserProfileDetails;
