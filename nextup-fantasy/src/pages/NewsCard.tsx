import { NewsTypes } from '../App';

function NewsCard({ link, image, title, playerId }: NewsTypes) {
  return (
    <div className=" max-w-[300px] max-h-[420px] bg-[#141414]  mx-auto  rounded-xl shadow-md overflow-hidden">
      <div className="" key={playerId}>
        <div className="">
          <img
            className="h-[200px] mt-4 w-full object-cover"
            src={`${image}`}
            alt=""
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-xs text-white font-semibold">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
