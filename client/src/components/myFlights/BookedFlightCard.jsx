// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const BookedFlightCard = ({ flight }) => {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    from,
    to,
    duration,
    price,
  } = flight;

  return (
    <div className="bg-white  lg:w-full h-[150px] rounded-sm text-gray-700 px-4 md:px-12 shadow-md">
      <div className="flex justify-between items-center px-4 py-6 ">
        <div>
          <img
            className="rounded-full object-cover h-5 w-5 sm:h-10 sm:w-10"
            src="https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png"
            alt="airline logo"
          />
        </div>
        <div className="flex flex-col ">
          <p className="sm:text-2xl">
            {departureTime} AM - {arrivalTime} PM
          </p>
          <div className="flex gap-16">
            <div>
              <p className="font-semibold">{flightNumber}</p>
              <p className="text-blue-400 text-sm">
                Flight&nbsp;Details
                {/* <ArrowDropDownIcon /> */}
              </p>
            </div>
            <div>
              <p className="font-semibold">Non&nbsp;Stop</p>
              <p className="text-sm text-gray-400">{duration}</p>
            </div>
            <div>
              <p className="font-semibold">
                {from} to {to ? to : "XYZ"}
              </p>
              <p className="text-sm text-gray-400">{flightNumber}</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-2">
          <div className="flex flex-col justify-around gap-2 border border-gray-300 rounded-md px-2 py-6">
            <p className="font-bold">$156</p>
            <p className="text-sm text-gray-400">Economy</p>
          </div>
          <div className="flex flex-col justify-around gap-2 border border-gray-300 rounded-md px-2 py-6">
            <p className="font-bold">$200</p>
            <p className="text-sm text-gray-400">Executive</p>
          </div>
          <div className="flex flex-col bg-gray-100 h-[102px] w-[78px] text-center justify-around gap-2 border border-gray-300 rounded-md px-2 py-6">
            <p className="font-bold"></p>
            <p className="text-sm text-gray-400">---</p>
          </div>
          <div className="flex flex-col justify-around gap-2 border border-gray-300 rounded-md px-2 py-6">
            <p className="font-bold">$300</p>
            <p className="text-sm text-gray-400">Business</p>
          </div>
          <div className="flex flex-col bg-gray-100 h-[102px] w-[78px] text-center justify-around gap-2 border border-gray-300 rounded-md px-2 py-6">
            <p className="font-bold"></p>
            <p className="text-sm text-gray-400">---</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedFlightCard;
