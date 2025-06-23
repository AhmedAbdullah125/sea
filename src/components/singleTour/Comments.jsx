import { parse } from 'date-fns'
import { TiStarFullOutline } from 'react-icons/ti'
import CommentForm from './CommentForm'

const Comments = ({ comments ,id }) => {

  return (
    <div className='space-y-2'>
      <div className='grid grid-cols-12 gap-2'>
        {comments?.map((comment, index) => (
          <div key={index} className='col-span-12 xl:col-span-6 bg-main-navy text-white p-6 rounded-[40px] space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <p className='size-10 rounded-full text-xs bg-white text-main-navy font-bold flex items-center justify-center '>{comment?.name?.trim().split(" ")[0].charAt(0) || "U"}</p>
                <p className='text-sm font-bold'>{comment?.name || "user"}</p>
              </div>
              <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7818 31.66L29.9477 7.33997H36.2036L29.9477 31.66H19.7818ZM1.7959 31.66L11.9618 7.33997H18.2178L11.9618 31.66H1.7959Z" fill="white" />
              </svg>
            </div>
            <p className='text-sm leading-loose'>{comment?.comment}</p>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-bold'>
                {new Date(comment?.created_at).toLocaleDateString('ar-EG', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
              {/* rate */}
              <div className="flex items-end gap-1 w-fit" >
                <p className="p-0 m-0 text-xs font-semibold">5 / {parseFloat(comment?.rating).toFixed(0)}</p>
                <TiStarFullOutline size={24} className="text-yellow-500" />
              </div >
            </div>
          </div>
        ))}
      </div>
      {/* comment form */}
      <CommentForm id={id} />
    </div>
  )
}

export default Comments
