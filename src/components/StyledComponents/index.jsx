import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const FormContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
`;

export const AuthForm = styled.form`
  width: 360px;
  margin: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  border-bottom: 1px solid gray;
  box-sizing: border-box;
`;

export const HeaderLink = styled(Link)`
  margin-right: 20px;
  text-decoration: none;
  line-height: 50px;
  font-size: 26px;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  color: black;
`;