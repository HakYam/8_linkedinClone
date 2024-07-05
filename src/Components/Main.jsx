import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostModal from './PostModal';
import ReactPlayer from 'react-player';
import { formatDistanceToNow } from 'date-fns';
import { db, storage } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const Main = ({ user, loading }) => {
  const [showModel, setShowModel] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [menuVisible, setMenuVisible] = useState({});


  // console.log(user)

  const handleClick = () => {
    setShowModel(!showModel);
  };

  const handleDeletePost = async (article) => {

    if (article.actor.uid !== user.uid) {
      alert('You can only delete your own posts');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        if (article.shareImg) {
          // Delete the image from storage
          const imageRef = ref(storage, article.shareImg);
          await deleteObject(imageRef);
        }

        // Delete the document from Firestore
        await deleteDoc(doc(db, 'articles', article.id));
        alert('Post deleted successfully');
      } catch (error) {
        alert('Failed to delete post: ' + error.message);
      }
    }
  };

  //console.log(articles)

  //show the delete tab
  const toggleMenu = (id) => {
    setMenuVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Fetching articles from firebase
  useEffect(() => {
    const fetchArticles = () => {
      const collRef = collection(db, 'articles');
      const orderedRef = query(collRef, orderBy('actor.date', 'desc'));
      const unsubscribe = onSnapshot(orderedRef, (snapshot) => {
        const fetchedArticles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(fetchedArticles);
        setLoadingArticles(false);
      });

      return unsubscribe; // Clean up the subscription on unmount and cut off db connection
    };

    fetchArticles();
  }, []);

  return (
    <Container>
      <ShareBox>
        <div>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="" />
          ) : (
            <img src='/images/user.svg' alt="" />
          )}
          <button onClick={handleClick} disabled={loading}>
            Create a post
          </button>
        </div>
        <div>
          <button onClick={handleClick} disabled={loading}>
            <img src='/images/photo-icon.svg' alt="" />
            <span>Photo</span>
          </button>
          <button onClick={handleClick} disabled={loading}>
            <img src='/images/video-icon.svg' alt="" />
            <span>Video</span>
          </button>
          <button onClick={handleClick} disabled={loading}>
            <img src='/images/event-icon.svg' alt="" />
            <span>Event</span>
          </button>
          <button onClick={handleClick} disabled={loading}>
            <img src='/images/article-icon.svg' alt="" />
            <span>Article</span>
          </button>
        </div>
      </ShareBox>

      {loadingArticles ? (
        <LoadingContainer>
          <LoadingImage src='/images/loader.svg' alt="Loading..." />
        </LoadingContainer>
      ) : articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Content>
          {articles.map((article, id) => (
            <Article key={id}>
              <SharedActor>
                <a>
                  <img src={article.actor.image} alt="" />
                  <div>
                    <span>{article.actor.title}</span>
                    <span>{formatDistanceToNow(new Date(article.actor.date.seconds * 1000), { addSuffix: true })}</span>
                  </div>
                </a>
                <button onClick={() => toggleMenu(article.id)}>
                  <img src='/images/ellipsis.svg' alt="" />
                </button>
                {menuVisible[article.id] && (
                  <Menu>
                    <MenuItem onClick={() => handleDeletePost(article)}>Delete</MenuItem>
                  </Menu>
                )}
              </SharedActor>
              <Description>{article.description}</Description>
              <SharedImg>
                <a>
                  {!article.shareImg && article.video ? (
                    <ReactPlayer width='100%' url={article.video} />
                  ) : (
                    article.shareImg && <img src={article.shareImg} alt="" />
                  )}
                </a>
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img
                      src="/images/like-blue.svg"
                      alt=""
                    />
                    <img
                      src="/images/love-icon.svg"
                      alt=""
                    />
                    <span>75</span>
                  </button>
                </li>
                <li>
                  <a>{article.comments} comments</a>
                </li>
                <li>
                  <a>1 share</a>
                </li>
              </SocialCounts>
              <SocialActions>
                <button>
                  <img src="/images/like-icon.svg" alt="" />
                  <span>Like</span>
                </button>
                <button>
                  <img src="/images/comment-icon.svg" alt="" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src="/images/share-icon.svg" alt="" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/images/send-icon.svg" alt="" />
                  <span>Send</span>
                </button>
              </SocialActions>
            </Article>
          ))}
        </Content>
      )}

      <PostModal showModel={showModel} handleClick={handleClick} user={user} loading={loading} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 1px rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      border-radius: 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px;
        }
        span {
          color: #70b5f9;
          margin-top: 2px;
        }
      }
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LoadingImage = styled.img`
  width: 60px;
  height: 60px;
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 70px;
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(2),
        &:nth-child(3) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: relative;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1;
`;

const MenuItem = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      align-items: center;
      border: none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  flex-wrap: wrap;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: rgba(0, 0, 0, 0.6);
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
    width: calc(100% / 4);
    height: 60px;
    justify-content: center;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
        margin-top: 3px;
        font-weight: 600;
      }
    }
  }
`;

export default Main;
