import { useState, useEffect } from "react"
import { Sidebar } from "./components/Sidebar"
import { Tweet } from "./components/Tweet"
import { TwitterForm } from "./components/TwitterForm"
import { getAvatar, getRandomImage } from "./utils/generateImages"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { TrendItem } from "./components/TrendItem"
import { FollowItem } from "./components/FollowItem"

function App() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      addNewRandomTweets()
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const addNewRandomTweets = () => {
    const randomTweets = [
      'COisa',
      'diacho',
      'não aguento mais',
      'muita coisa',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'
    ]
    const randomTweet  = randomTweets[Math.floor(Math.random() * randomTweets.length)]

    addNewTweet(randomTweet, Math.random() > 0.7)
  }

  const addNewTweet = (content, includeImage = false) => {
    const newTweet = {
      id: crypto.randomUUID(),
      name: "User",
      username: `user${Math.floor(Math.random() * 1000)}`,
      avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`),
      content,
      time: new Date().toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0
    }
    setTweets((prevTweets) => [newTweet, ...prevTweets])
  }

  return (
    <div className="flex mx-auto max-w-7xl">
      <Sidebar/>
      <main className="grow border-l border-r border-gray-700 max-w-xl">
        <header className="sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm">
          <h2 className="px-4 py-3 text-xl font-bold">For you</h2>
        </header>
        <TwitterForm onTweet={(content) => addNewTweet(content, Math.random() > 0.6)}/>
        <div>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet}/>
          ))}
          
        </div>
      </main>
      <aside className="hidden xl:block w-80 px-4">
          <div className="sticky top-0 pt-2">
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-500"/>
              <input placeholder="Search Twitter" className="w-full bg-gray-800 rounded-full outline-none py-2 pl-10 pr-4 text-white" />
            </div>
            <div className="bg-gray-800 rounded-xl mt-4 p-4">
              <h2 className="font-bold text-xl mb-4">Subscribe to Premium</h2>
              <p className="text-gray-500 mb-4">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
              <button className="bg-twitter-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">Subscribe</button>
            </div>
            <div className="bg-gray-800 rounded-xl mt-4 p-4">
              <h2 className="font-bold text-xl mb-4">What's happening?</h2>
              <TrendItem category="NFL . Live" name="Cardinals at Bills" tweetCount="12,3123"/>
              <TrendItem category="World Cup" name="Argentina lost to Spain" tweetCount="123,000,000"/>
              <TrendItem category="EJS" name="Síntese Jr. the best EJ in the whole world" tweetCount="213,123"/>
            </div>
            <div className="bg-gray-800 rounded-xl mt-4 p-4">
              <h2 className="font-bold">Who to follow</h2>
              <FollowItem name="Bill Gates" username="BillGates"/>
              <FollowItem name="Will Smith" username="Wills"/>
            </div>
          </div>
      </aside>
    </div>
  )
}

export default App