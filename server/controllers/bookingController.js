
// import Booking from "../models/Booking.js";
// import Car from "../models/Car.js";



// // function to check availability of car for a date

// const checkAvailability =async(car,pickupDate,returnDate)=>{
//     const bookings=await Booking.find({
//         car,
//         pickupDate:{$lt:new Date(returnDate)},
//         returnDate:{$gt:new Date(pickupDate)},
//     })
//     return bookings.length===0
// }


// // api to check availability of cars for given date and location

// export const checkAvailabilityOfcar=async(req,res)=>{
//     try{
// const {location,pickupDate,returnDate}=req.body

// const cars=await Car.find({location,isAvaliable:true})

// const availableCarsPromise=cars.map(async (car)=>{
//    const isAvailable= await checkAvailability(car._id,pickupDate,returnDate)
//     return{...car._doc,isAvailable:isAvailable}
// })

// let availableCars=await Promise.all(availableCarsPromise);
// availableCars=availableCars.filter(car=>car.isAvailable===true)

// res.json({success:true,availableCars})
//     }
//     catch (error){
// console.log(error.message);
// res.json({success:false,message:error.message})
//     }

// }


// // api to create booking

// export const createBooking=async(req,res)=>{
//     try{
//         const{_id}=req.user;
//         const{car,pickupDate,returnDate}=req.body

//         const isAvailable=await checkAvailability(car,pickupDate,returnDate)

//         if(!isAvailable){
//             return res.json({success:false,message:"car is not available"})

//         }

//         const carData=await Car.findById(car)

//         const picked=new Date(pickupDate)
//         const returned=new Date(returnDate)
//         const noOfDays=Math.ceil((returned-picked)/(1000*60*60*24))
//         const price=carData.pricePerDay*noOfDays;

//         await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})
//   res.json({success:true,message:"Booking Created"})

//     }
//     catch(error){
// console.log(error.message);
// res.json({success:false,message:error.message})

//     }

// }


// // api to list user Bookings

// export const getUserBookings=async(req,res)=>{

//     try{
// const {_id}=req.user

// const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
// res.json({success:true,bookings})
//     }
//     catch(error){
// console.log(error.message);
// res.json({success:false,message:error.message})

//     }
// }





// export const getOwnerBookings=async(req,res)=>{

//     try{
//         if(req.user.role!='owner'){
//             return res.json({success:false,message:"Unauthorized"})
//         }
//         const bookings=await Booking.find({owner:req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1})
//         res.json({success:true,bookings})
//     }
//     catch(error){
// console.log(error.message);
// res.json({success:false,message:error.message})

//     }
// }




// export const changeBookingStatus=async(req,res)=>{

//     try{
//         const{_id}=req.user;
//         const{bookingId,status}=req.body
//         const booking=await Booking.findById(bookingId)

// if(booking.owner.toString()!==_id.toString()){
// return res.json({success:false,message:"unauthorized"})
// }

// booking.status=status;
// await booking.save()

// res.json({success:true,message:"Status updated"})
//     }

//     catch(error){
// console.log(error.message);
// res.json({success:false,message:error.message})

//     }
// }


import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Function to check availability of a car between two dates
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lt: new Date(returnDate) },
    returnDate: { $gt: new Date(pickupDate) },
  });
  return bookings.length === 0;
};

// ✅ API to check available cars for given date and location
export const checkAvailabilityOfcar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // Use case-insensitive match for location
    const cars = await Car.find({
      location: { $regex: new RegExp(location, "i") },
      isAvaliable: true,
    });

    const availableCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromise);
    availableCars = availableCars.filter(car => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API to create a booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate: new Date(pickupDate),
      returnDate: new Date(returnDate),
      price,
    });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API to get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API to get owner bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate('car user')
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
