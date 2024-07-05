import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { signInAPI } from '../redux/API';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const handleSignIn = () => {
    dispatch(signInAPI());
  };

  /* redirect to /home if there is a logged in user */
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);


  return (
    <Container>

      <Nav>
        <a href='/index.html'>
          <img src='/images/login-logo.svg' alt='Logo' />
        </a>
        <NavActions>
          <Join>Join now</Join>
          <SignIn onClick={handleSignIn}>Sign in</SignIn>
        </NavActions>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src='/images/login-hero.svg' alt='Hero' />
        </Hero>
        <Form>
          <Google onClick={handleSignIn}>
            <img src='/images/google.svg' alt='Google' style={{paddingRight : '5px'}}/>
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 90%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-left: 12px;
    @media (max-width: 768px) {
      margin-left: 8px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

const SignIn = styled.a`
cursor: pointer;
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 2px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
  @media (max-width: 768px) {
    padding: 0px 10px;
    border-radius: 40px;
    font-size: 13px;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 130px;
  padding-top: 40px;
  padding: 40px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }
`;

const Hero = styled.div`
  width: 100%;
  
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 400;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 22px;
      width: 100%;
      line-height: 1.3;
      font-weight: 400;
      padding-bottom: 25px;
    }
  }
  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: 100%;
      position: static;
      height: auto;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 400px;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 90%;
  }
`;

const Google = styled.button`
cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 /0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

export default Login;
