import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const CopyRight = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 12px;
`;

function Footer() {
  return (
    <Wrapper>
      <CopyRight>~~ Made by 식대수비대 ~~</CopyRight>
    </Wrapper>
  );
}

export default Footer;
