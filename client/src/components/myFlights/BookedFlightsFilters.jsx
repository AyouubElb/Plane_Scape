// import Rating from '@mui/material/Rating';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const BookedFlightsFilters = () => {
  return (
    <div className="bg-white flex  justify-between px-4 sm:px-12 mt-2 py-3 lg:w-full">
      <div className="flex items-center justify-center gap-4">
        <button className="px-2 sm:px-4 py-1 sm:py-2 border rounded-md text-gray-700">
          Times
        </button>
        <button className="px-2 sm:px-4 py-1 sm:py-2 border rounded-md text-gray-700">
          Stops
        </button>
        <button className="px-2 sm:px-4 py-1 sm:py-2 border rounded-md text-gray-700">
          Airlines
        </button>
        <button className="px-2 sm:px-4 py-1 sm:py-2 border rounded-md text-gray-700">
          Airports
        </button>
        <button className="px-2 sm:px-4 py-1 sm:py-2 border rounded-md text-gray-700">
          Amenities
        </button>
        <p className="hidden lg:block text-blue-500">
          Edit Search
          {/* <ArrowDropDownIcon/> */}
        </p>
      </div>

      <div className="hidden lg:flex justify-center items-center gap-4">
        <div className="flex flex-col">
          {/* <Rating sx={{color:'black', fontSize : 'medium'}} name="read-only" value={2} max={3} readOnly />
                <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={0} max={3} readOnly /> */}
        </div>
        <div className="text-gray-300 ">|</div>
        <div className="flex flex-col">
          {/* <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={3} max={3} readOnly />
                <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={0} max={3} readOnly /> */}
        </div>
        <div className="text-gray-300 ">|</div>
        <div className="flex flex-col">
          {/* <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={3} max={3} readOnly />
                <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={1} max={3} readOnly /> */}
        </div>
        <div className="text-gray-300 ">|</div>
        <div className="flex flex-col">
          {/* <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={3} max={3} readOnly />
                <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={2} max={3} readOnly /> */}
        </div>
        <div className="text-gray-300 ">|</div>
        <div className="flex flex-col">
          {/* <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={3} max={3} readOnly />
                <Rating sx={{color:'black',fontSize : 'medium'}} name="read-only" value={3} max={3} readOnly /> */}
        </div>
      </div>
    </div>
  );
};

export default BookedFlightsFilters;
