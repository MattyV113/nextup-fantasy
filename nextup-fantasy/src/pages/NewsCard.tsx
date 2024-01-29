import { NewsTypes } from '../App';

function NewsCard({ link, image, title, playerId }: NewsTypes) {
  return (
    <div className=" max-w-[300px] max-h-[420px]  mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="" key={playerId}>
        <div className="">
          <img
            className="h-[200px] mt-4 w-full object-cover"
            src={`${image}`}
            alt=""
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-black font-semibold">
            {title}
          </div>

          <a className="inline-flex no-underline items-center decoration-none  px-3 py-2 text-sm font-medium text-center text-white  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
