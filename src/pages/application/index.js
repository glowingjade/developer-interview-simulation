import { useForm } from 'react-hook-form';

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    name: event.target.name.value,
    application: event.target.application.value,
    position: event.target.position.value,
    motivation: event.target.motivation.value,
    skill: event.target.skill.value,
  }

  const response = await fetch('/api/application', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  console.log(responseData);
}

export default function Application() {
  const { register, errors } = useForm();
  return (
    <div>
      <form className="flex flex-col justify-items-center" onSubmit={handleSubmit}>
        <label className="label">이름</label>
        <br />
        <input className="input input-bordered input-primary" type="text" {...register("name")} />
        <br />
        <label className="label">지원서</label>
        <br />
        <input className="file-input" type="file" {...register("application")} />
        <br />
        <label>지원 포지션</label>
        <br />
        <input className="input input-bordered input-primary" type="text" {...register("position")} />
        <br />
        <label>지원 동기</label>
        <br />
        <input className="input input-bordered input-primary" type="text" {...register("motivation")} />
        <br />
        <label>기술 스택</label>
        <br />
        <input className="input input-bordered input-primary" type="text" {...register("skill")} />
        <br />
        <button className="btn" type="submit">제출</button>
      </form>
    </div>
  );
}
