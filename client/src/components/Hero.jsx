import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
const {navigate,pickupDate,returnDate,setPickupDate,setReturnDate}=useAppContext();

  const handleSearch=(e)=>{  
    e.preventDefault()
navigate('/cars?pickupLocation='+pickupLocation+'&pickupDate='+pickupDate+'&returnDate='+returnDate)
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
      <h1 className='text-4xl md:text-5xl font-semibold'>luxury car on rent</h1>

      <form 
      onSubmit={handleSearch}
       action="" className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8'>
          
          <div className='flex flex-col items-start gap-2'>
            <select
              required value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              name=""
              id=""
              className='border border-gray-300 rounded-md px-4 py-2'
            >
              <option value="">pickup location</option>
              {cityList.map((city) => (
                <option value={city} key={city}>{city}</option>
              ))}
            </select>
            <p className='px-1 text-sm text-gray-500'>
              {pickupLocation ? pickupLocation : 'please select location'}
            </p>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
            value={pickupDate}
            onChange={e=>setPickupDate(e.target.value)}
              type="date"
              name=""
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
              className='text-sm text-gray-500'
            />
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input
                value={returnDate}
            onChange={e=>setReturnDate(e.target.value)}

              type="date"
              name=""
              id="return-date"
              className='text-sm text-gray-500'
            />
          </div>


        </div>
        <button className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full
cursor-pointer'>
            <img src={assets.search_icon} alt="search" 
            className='brightness-300'/>
            
            search
            </button>
      </form>

      <img src={assets.main_car} alt="car" className='max-h-74' />
    </div>
  );
};

export default Hero;


// import React, { useState } from 'react';
// import { assets, cityList } from '../assets/assets';
// import { useAppContext } from '../context/AppContext';

// const Hero = () => {
//   const [pickupLocation, setPickupLocation] = useState('');
//   const { navigate, pickupDate, returnDate, setPickupDate, setReturnDate } = useAppContext();

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!pickupLocation || !pickupDate || !returnDate) {
//       alert("Please fill all fields");
//       return;
//     }

//     navigate(
//       `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
//     );
//   };

//   return (
//     <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
//       <h1 className='text-4xl md:text-5xl font-semibold'>Luxury Car on Rent</h1>

//       <form
//         onSubmit={handleSearch}
//         className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'
//       >
//         <div className='flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8'>
//           {/* Location */}
//           <div className='flex flex-col items-start gap-2'>
//             <select
//               required
//               value={pickupLocation}
//               onChange={(e) => setPickupLocation(e.target.value)}
//               className='border border-gray-300 rounded-md px-4 py-2'
//             >
//               <option value="">Pickup location</option>
//               {cityList.map((city) => (
//                 <option value={city} key={city}>{city}</option>
//               ))}
//             </select>
//             <p className='px-1 text-sm text-gray-500'>
//               {pickupLocation ? pickupLocation : 'Please select location'}
//             </p>
//           </div>

//           {/* Pickup Date */}
//           <div className='flex flex-col items-start gap-2'>
//             <label htmlFor="pickup-date">Pick-up Date</label>
//             <input
//               value={pickupDate}
//               onChange={(e) => setPickupDate(e.target.value)}
//               type="date"
//               id="pickup-date"
//               min={new Date().toISOString().split('T')[0]}
//               className='text-sm text-gray-500'
//             />
//           </div>

//           {/* Return Date */}
//           <div className='flex flex-col items-start gap-2'>
//             <label htmlFor="return-date">Return Date</label>
//             <input
//               value={returnDate}
//               onChange={(e) => setReturnDate(e.target.value)}
//               type="date"
//               id="return-date"
//               min={pickupDate || new Date().toISOString().split('T')[0]}
//               className='text-sm text-gray-500'
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'
//         >
//           <img src={assets.search_icon} alt="search" className='brightness-300' />
//           Search
//         </button>
//       </form>

//       <img src={assets.main_car} alt="car" className='max-h-74' />
//     </div>
//   );
// };

// export default Hero;
