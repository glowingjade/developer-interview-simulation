import {useRouter} from 'next/router'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import qs from 'qs'

export default function Result() {
  const router = useRouter()

  const {
    confidence,
    communicationSkill,
    technicalSkill,
    feedbacks,
  } = qs.parse(router.asPath.split('?')[1])

  return (
      <main className="max-w-xl mx-auto flex flex-col items-center">
        <CheckCircleIcon className="mt-10 text-blue-500 w-32"/>

        <div className=" mt-3 font-bold text-gray-800 text-lg text-center">
          면접 보느라 수고 많으셨습니다!
          <br/>
          면접 결과는 아래와 같습니다
        </div>

        <div>
          <div className="flex mt-16">
            <div className="mr-5 text-lg font-bold text-gray-800 w-36 text-left">자신감</div>

            <div className="rating">
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-green-500"
                     checked={confidence === '1'}/>
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-green-500"
                     checked={confidence === '2'}/>
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-green-500"
                     checked={confidence === '3'}/>
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-green-500"
                     checked={confidence === '4'}/>
              <input type="radio" name="rating-1" className="mask mask-star-2 bg-green-500"
                     checked={confidence === '5'}/>
            </div>
          </div>

          <div className="flex mt-4">
            <div className="mr-5 text-lg font-bold text-gray-800 w-36 text-left">커뮤니케이션 역량</div>

            <div className="rating">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-500"
                     checked={communicationSkill === '1'}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-500"
                     checked={communicationSkill === '2'}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-500"
                     checked={communicationSkill === '3'}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-500"
                     checked={communicationSkill === '4'}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-green-500"
                     checked={communicationSkill === '5'}/>
            </div>
          </div>

          <div className="flex mt-4">
            <div className="mr-5 text-lg font-bold text-gray-800 w-36 text-left">기술적 역량</div>

            <div className="rating">
              <input type="radio" name="rating-3" className="mask mask-star-2 bg-green-500"
                     checked={technicalSkill === '1'}/>
              <input type="radio" name="rating-3" className="mask mask-star-2 bg-green-500"
                     checked={technicalSkill === '2'}/>
              <input type="radio" name="rating-3" className="mask mask-star-2 bg-green-500"
                     checked={technicalSkill === '3'}/>
              <input type="radio" name="rating-3" className="mask mask-star-2 bg-green-500"
                     checked={technicalSkill === '4'}/>
              <input type="radio" name="rating-3" className="mask mask-star-2 bg-green-500"
                     checked={technicalSkill === '5'}/>
            </div>
          </div>

          <div className="mt-16 text-lg font-bold text-gray-800">피드백</div>

          <ul className="list-disc pl-4 mt-2">
            {(feedbacks || []).map((v, index) => (
                <li key={index}>{v}</li>
            ))}
          </ul>
        </div>
      </main>
  )
}

export const getServerSideProps = async () => ({props: {}})
