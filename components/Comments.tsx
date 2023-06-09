import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 mobile:px-[1rem] min-[320px]:px-[2rem] min-[328px]:px-[2.5rem] mt-4 bg-[#F8F8F8] dark:bg-bgDark border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[355px] xl:h-[479px]'>
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=' p-2 items-center mobile:mb-[5px] sm:mb-0' key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary dark:text-white'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className='-mt-5 ml-16 text-[16px] dark:text-white mr-8'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text='Sem comentários ainda! Seja o primeiro a adicionar.' />
        )}
      </div>
     {userProfile && <div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10'>
        <form onSubmit={addComment} className='flex flex-wrap gap-4 mobile:justify-center'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='bg-primary dark:bg-bgDark duration-700 px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] dark:text-white lg:w-[350px] border-gray-100 outline-none focus:border-[#a00c60] flex-1 rounded-lg hover:border-[#f51997]'
            placeholder='Adicionar comentário..'
          />
          <button className='text-md text-gray-400 duration-700 hover:text-[#f51997]' onClick={addComment}>
            {isPostingComment ? 'Comentando...' : 'Comente'}
          </button>
        </form>
      </div>}
    </div>
  );
};

export default Comments;