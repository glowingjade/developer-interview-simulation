import {Inter} from 'next/font/google'
import {openai} from '@/utils/openai'
import {useEffect} from 'react'

const inter = Inter({subsets: ['latin']})

export default function Home() {
  const a = async () => {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: 'Hello world'}],
    })

    console.log('chat_completion', chatCompletion.data.choices[0].message.content)
  }

  useEffect(() => {
    a()
  }, [])

  return (
      <main>
        <div className="navbar bg-base-100">
          <a className="btn btn-ghost normal-case text-xl">InterviewGPT</a>
        </div>

        <div className="pb-4">
          <div className="chat chat-start">
            <div className="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble">You underestimate my power!</div>
          </div>
        </div>

        <div className="w-full flex p-2 border-t">
          <input type="text" placeholder="Type here" className="input input-bordered w-full mr-4"/>

          <button className="btn">Button</button>
        </div>
      </main>
  )
}
