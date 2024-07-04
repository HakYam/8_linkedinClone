import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import styled from "styled-components";
import { signOutAPI } from "../redux/API";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {

    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOutAPI())
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate])



    return (
        <Container>

            <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/home-logo.svg" alt="Home" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder="Search" />
                        <SearchIcon>
                            <img src="/images/search-icon.svg" alt="Search" />
                        </SearchIcon>
                    </div>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className="active">
                            <a href="#">
                                <img src="/images/nav-home.svg" alt="Home" />
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="#">
                                <img src="/images/nav-network.svg" alt="My Network" />
                                <span>My Network</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="#">
                                <img src="/images/nav-jobs.svg" alt="Jobs" />
                                <span>Jobs</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="#">
                                <img src="/images/nav-messaging.svg" alt="Messaging" />
                                <span>Messaging</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="#">
                                <img src="/images/nav-notifications.svg" alt="Notifications" />
                                <span>Notifications</span>
                            </a>
                        </NavList>
                        <User>
                            <a href="#">
                                {user && user.photoURL ? (
                                    <img src={user.photoURL} alt="User" />
                                ) : (
                                    <img src="/images/user.svg" alt="User" />
                                )}
                                <span>
                                    Me
                                    <img src="/images/down-icon.svg" alt="Dropdown" />
                                </span>
                            </a>
                            <SignOut onClick={handleSignOut}>
                                <a href="#">Sign Out</a>
                            </SignOut>
                        </User>
                        <Work>
                            <a href="#">
                                <img src="/images/nav-work.svg" alt="Work" />
                                <span>
                                    Work
                                    <img src="/images/down-icon.svg" alt="Dropdown" />
                                </span>
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  
  padding-right: 20px;
  padding-left: 20px;
  position: fixed;
  top: 0;
  width: 97vw;
  z-index: 100;
  @media (max-width: 767px) {
    padding: 15px;
  }
  @media (max-width: 1024px) {
    padding: 15px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 220px;
    @media (max-width: 768px) {
        max-width: 100%
    }
    
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 77%;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      @media (max-width: 768px) {
       
      }
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;

  &:first-child {
    @media (max-width: 768px) {
      display: none;
    }
  }
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
  @media (max-width: 767px) {
    position: absolute;
    top: -45px;
    right: 15px;
    background: #eee;
  }
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  @media (max-width: 575px) {
    display: none;
  }
`;

export default Header;
