import {Inter} from 'next/font/google'
import {openai} from '@/utils/openai'
import {useState} from 'react'

const inter = Inter({subsets: ['latin']})

export default function Home() {
  /**
   * { role: 'user' | 'assistant', content: string }[]
   */
  const [messages, setMessages] = useState([
    {role: 'assistant', content: '안녕하세요. 면접을 진행하겠습니다. 먼저 간단한 자기소개 부탁드립니다.'},
  ])
  const [userText, setUserText] = useState('')
  const [messageGenerating, setMessageGenerating] = useState(false)

  const generateMessage = async (messages) => {
    try {
      setMessageGenerating(true)

      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: '너는 개발자 면접을 보는 면접관이야. 면접관처럼 대화하도록 해.'},
          ...messages,
        ],
      })

      const message = chatCompletion.data.choices[0].message

      setMessages([...messages, {role: message.role, content: message.content}])

      setMessageGenerating(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleUserTextSubmit = async () => {
    setUserText('')
    const newMessages = [...messages, {role: 'user', content: userText}]
    setMessages(newMessages)
    await generateMessage(newMessages)
  }

  return (
      <main>
        <div className="navbar bg-base-100">
          <a className="btn btn-ghost normal-case text-xl">InterviewGPT</a>
        </div>

        <div className="pb-4">
          {messages.map(({role, content}, index) => (
              <div key={index} className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-bubble">{content}</div>
              </div>
          ))}
        </div>

        <div className="w-full flex p-2 border-t">
          <input type="text" placeholder="Type here" className="input input-bordered w-full mr-4" value={userText}
                 onChange={e => setUserText(e.target.value)}
          />

          <button className="btn" disabled={!!messageGenerating} onClick={handleUserTextSubmit}>전송</button>
        </div>
      </main>
  )
}
