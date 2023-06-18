import {openai} from '@/utils/openai'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import qs from 'qs'


export default function Chat() {
  const router = useRouter()

  const {
    name,
    position,
    skill,
    duration,
  } = router.query

  /**
   * { role: 'user' | 'assistant', content: string }[]
   */
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `안녕하세요, ${name}님. 저희 회사의 ${position}에 지원해 주셔서 감사합니다. 먼저, ${name}님께서 저희 회사에 지원하신 이유에 대해 알려주실 수 있나요?`,
    },
  ])
  const [userText, setUserText] = useState('')
  const [messageGenerating, setMessageGenerating] = useState(false)
  const [firstMessageTimestamp, setFirstMessageTimestamp] = useState(null)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [ended, setEnded] = useState(false)
  const [generatingResult, setGeneratingResult] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(firstMessageTimestamp ? Math.max(duration * 60 - Math.floor((Date.now() - firstMessageTimestamp) / 1000), 0) : duration * 60)
    }, 1000)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (timeLeft <= 0) {
      setEnded(true)
    }
  }, [timeLeft])

  const generateMessage = async (messages) => {
    setMessageGenerating(true)

    try {
      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `너는 개발자 면접을 보는 면접관이야. 면접관처럼 대화하도록 해.
지원자의 이름은 ${name}이고, 지원 포지션은 ${position}이고, 기술 스택은 ${skill}이야.
컬처핏에 대한 질문들을 먼저 진행하고, 그 다음 지원자의 기술 역량과 스킬에 대해 질문해줘.`
          },
          ...messages,
        ],
      })

      const message = chatCompletion.data.choices[0].message

      if (!ended) {
        setMessages([...messages, {role: message.role, content: message.content}])
      }
    } finally {
      setMessageGenerating(false)
    }
  }

  const handleUserTextSubmit = async (evt) => {
    evt.preventDefault()

    setUserText('')
    const newMessages = [...messages, {role: 'user', content: userText}]
    setMessages(newMessages)
    if (!firstMessageTimestamp) {
      setFirstMessageTimestamp(Date.now())
    }
    await generateMessage(newMessages)
  }

  const showResult = async () => {
    setGeneratingResult(true)

    try {
      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `너는 개발자 면접을 보는 면접관이야. 면접자의 면접 기록을 보고, 면접자의 점수를 매겨줘. 자신감, 커뮤니케이션 역량, 기술적 역량을 점수화하고, 개선이 필요한 사항을 피드백 해줘야해.

아래 형태의 JSON으로 결과를 출력하도록 해.
{"confidence": number, "communicationSkill": number, "technicalSkill": number, "feedbacks": string[]}
confidence: 자신감. 1~5 사이의 정수.
communicationSkill: 커뮤니케이션 역량. 1~5 사이의 정수.
technicalSkill: 기술적 역량. 1~5 사이의 정수.
feedbacks: 개선이 필요한 사항들.`
          },
          {
            role: 'user',
            content: `아래 대화내역을 보고 JSON 형식으로 피드백을 해줘. 오직 JSON만 출력해.
          
${messages.map((v) => `${v.role === 'assistant' ? '면접관' : '면접자'}: ${v.content}`).join('\n')}`
          }
        ],
      })

      const message = chatCompletion.data.choices[0].message.content

      const parsed = JSON.parse(message)

      const {confidence, communicationSkill, technicalSkill, feedbacks} = parsed

      const queries = qs.stringify({
        confidence,
        communicationSkill,
        technicalSkill,
        feedbacks,
      })

      await router.push(`/result?${queries}`)
    } finally {
      setGeneratingResult(false)
    }
  }

  return (
      <main className="max-w-2xl mx-auto">
        {!ended && (
            <div className="pl-3 mb-5 flex items-center">
              <div className="text-blue-500 font-bold text-[15px]">
                남은 면접시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
              </div>

              <button className="btn btn-sm ml-4" onClick={() => {
                setEnded(true)
              }}>종료하기</button>
            </div>
        )}

        <div className="pb-4">
          {messages.map(({role, content}, index) => (
              <div key={index} className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-bubble">{content}</div>
              </div>
          ))}

          {messageGenerating && (
              <div className="chat chat-start">
                <div className="chat-bubble">
                  <span className="loading loading-spinner loading-xs"></span>
                </div>
              </div>
          )}

          {ended && (
              <div className="mt-10 mb-4 w-full flex flex-col items-center">
                <div className="text-gray-700 font-medium text-[15px]">면접이 종료되었습니다.</div>

                <button className="mt-3 btn btn-primary" type="button" onClick={showResult} disabled={generatingResult}>
                  {generatingResult ? (
                      <span className="loading loading-spinner loading-xs"></span>
                  ) : (<>결과 확인하러 가기</>)}
                </button>
              </div>
          )}
        </div>

        <form className="w-full flex p-2 border-t" onSubmit={handleUserTextSubmit}>
          <input type="text" placeholder="Type here" className="input input-bordered w-full mr-4" value={userText}
                 onChange={e => setUserText(e.target.value)}
                 disabled={ended}
          />

          <button className="btn" type="submit" disabled={!!messageGenerating || ended}>전송
          </button>
        </form>
      </main>
  )
}

export const getServerSideProps = async () => ({props: {}})
