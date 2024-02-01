import React from 'react';
import { Link } from 'react-router-dom';
import SFLogo from '/Users/mattyv113/Desktop/workspace/nextup-fantasy/nextup-fantasy/src/assets/49ers-logo.webp';
import ChiefsLogo from '/Users/mattyv113/Desktop/workspace/nextup-fantasy/nextup-fantasy/src/assets/chiefs-logo.jpeg';

function ScheduleCard() {
  return (
    <div className="mt-[50px]  mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:p-8 p-2 flex md:flex-row md:gap-4">
        <div>
          <img
            src={SFLogo}
            alt="49ers logo"
            className="invisible md:visible w-[200px] h-[150px]"
          />
          <p className="mt-2 line-clamp-3 text-slate-700">San Fransico 49ers</p>
        </div>
        <div>
          <p className="mt-2  line-clamp-3 md:ml-[100px] md:mr-[100px] text-slate-700">
            at
          </p>
        </div>
        <div>
          <img
            src={ChiefsLogo}
            alt="Chiefs Logo"
            className="w-[200px] invisible md:visible h-[150px]"
          />
          <p className="mt-2 line-clamp-3 text-slate-700">Kansas City Chiefs</p>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
