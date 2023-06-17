import { useForm } from 'react-hook-form';
import styles from '../../styles/application.module.css';

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
    <div className={styles.background}>
      <form onSubmit={handleSubmit}>
        <label>이름</label>
        <br />
        <input type="text" {...register("name")} />
        <br />
        <label>지원서</label>
        <br />
        <input type="file" {...register("application")} />
        <br />
        <label>지원 포지션</label>
        <br />
        <input type="text" {...register("position")} />
        <br />
        <label>지원 동기</label>
        <br />
        <input type="text" {...register("motivation")} />
        <br />
        <label>기술 스택</label>
        <br />
        <input type="text" {...register("skill")} />
        <br />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
