import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Addtopic from './components/addtopic';
import Dashboard from './components/dashboard';
import LandingPage from './components/landingPage';
import ShowData from './components/showData';

function App() {
  const username = "Anon@123";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const initialState = [
    {
      id: 1,
      name: "Yash",
      data: [
        {
          id: 10,
          text: "Yash is FULL Stack Dev",
          status: "green"
        },
        {
          id: 11,
          text: "Yash has learned MERN Stack",
          status: "green"
        },
        {
          id: 12,
          text: "Yash actively solves questions on LEETCODE",
          status: "green"
        },
      ],
      completed: 100
    }
  ]

  function deleteItem(itemId) {
    let myTopics = topics.filter((item) => {
      return item.id !== itemId
    })

    setTopics(myTopics)
  }

  const myItem = JSON.parse(localStorage.getItem("topics"))
  const [topics, setTopics] = useState((myItem) ? myItem : initialState)
  // const [topics, setTopics] = useState(initialState)


  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics))
  }, [topics])





  return (
    <Routes>
      <Route path='/' element={<LandingPage username={username} setIsLoggedIn={setIsLoggedIn} />}></Route>
      <Route path='/dashboard' element={<Dashboard deleteItem={deleteItem} topics={topics} isLoggedIn={isLoggedIn} />}></Route>
      <Route path='/addTopic' element={<Addtopic setTopics={setTopics} isLoggedIn={isLoggedIn} />}></Route>
      <Route path='/showData/:itemId' element={<ShowData setTopics={setTopics} topics={topics} isLoggedIn={isLoggedIn} />}></Route>
    </Routes>
  );
}

export default App;
