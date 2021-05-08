import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import kakaologo from "../img/kakao_login.png";
import naverlogo from "../img/naver_login.png";

export default function LoginPage() {
  return (
    <Wrapper>
      <section className="container">
        <div>
          <h1>Welcome</h1>
          <span>식대수비대 사랑해주세요~!</span>
          <div className="login-container">
            <div className="App">
              <a href="http://localhost:4000/auth/kakao">
                <img className="login-img" src={kakaologo} />
              </a>
              <a href="http://localhost:4000/auth/naver">
                <img className="login-img" src={naverlogo} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial;

    > div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 25%;
      height: 45%;
      > h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }
      > span:nth-child(2) {
        font-size: 1.1rem;
        color: #808080;
        margin-bottom: 70px;
      }
      > span:nth-child(3) {
        margin: 10px 0 20px;
        color: red;
      }
      .login-container {
        width: 70%;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-img {
          width: 200px;
          height: 100px;
          object-fit: contain;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
`;
