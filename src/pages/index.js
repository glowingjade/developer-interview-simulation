import {useForm} from 'react-hook-form'
import qs from 'qs'
import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()
  const {register, errors} = useForm()

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    const queries = qs.stringify({
      name: evt.target.name.value,
      position: evt.target.position.value,
      skill: evt.target.skill.value,
      duration: evt.target.duration.value,
    })

    await router.push(`/chat?${queries}`)
  }

  return (
      <main className="max-w-2xl mx-auto">
        <form className="flex flex-col justify-items-center" onSubmit={handleSubmit}>
          <label className="label">이름</label>
          <input className="input input-bordered input-primary" type="text" {...register('name')} />

          <label className="mt-5">지원 포지션</label>
          <input className="input input-bordered input-primary" type="text" {...register('position')} />

          <label className="mt-5">기술 스택</label>
          <input className="input input-bordered input-primary" type="text" {...register('skill')} />

          <label className="mt-5">면접 시간 (분)</label>
          <input className="input input-bordered input-primary" type="number" {...register('duration')} />

          <button className="mt-10 btn" type="submit">제출</button>
        </form>
      </main>
  )
}
