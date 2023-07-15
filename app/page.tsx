import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div className='h-screen w-full'>
        <div className='h-full w-full grid grid-cols-2 justify-center items-center'>
          <div className='flex justify-center p-3'>
            <Link href={'/games'}>
              <button className='text-white rounded-lg p-16 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'>games</button>
            </Link>
          </div>
          <div className='flex justify-center p-3'>
            <Link href={'/utilities'}>
              <button className='text-white rounded-lg p-16 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'>utilities</button>
            </Link>
          </div>
          <div className='flex justify-center p-3'>
            <Link href={'/miscellaneous'}>
              <button className='text-white rounded-lg p-16 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'>miscellaneous</button>
            </Link>
          </div>
          <div className='flex justify-center p-3'>
            <Link href={'/code'}>
              <button className='text-white rounded-lg p-16 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'>coding</button>
            </Link>
          </div>
        </div>
      </div>
      </>
  );
};

export default Home;
