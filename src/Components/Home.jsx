import React from 'react'
import styled from 'styled-components';
import Leftside from './Leftside';
import Main from './Main';
import Rightside from './Rightside';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector((state) => state.userState.user);
    const loading = useSelector((state) =>state.articlesState.loading);
    const articles = useSelector((state)=>state.articlesState.articles)

    return (
        <Container>
            <Section>
                <h5>
                    <a href='#'>Hiring in a Harry? - </a>
                </h5>
                <p>
                    Find talented people and keep the business moving.
                </p>
            </Section>
            <Layout>
                <Leftside user={user} />
                <Main user={user} loading={loading} articles={articles}/>
                <Rightside />
            </Layout>
        </Container>
    )
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;
const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 5px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home