import React from 'react';
import axios from 'axios';

import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length 
        ? videos?.map((video: Video) => (
          // <VideoCard post={video} isShowingOnHome key={video._id} />
          <VideoCard post={video}/>
        ))
        : <NoResults text={`Sem Videos`}/>}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: {
      videos: data
    }
  }
}
