import Hotel from "../modules/Hotel.js";
import Room from "../modules/Room.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);

    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(error){
        next(error);
    }
};


export const updateHotel = async (req,res,next)=>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        const savedHotel = await updateHotel.save();
        res.status(200).json(savedHotel);
    }catch(error){
        next(error);
}
}

export const deleteHotel = async (req,res,next)=>{
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been delete");
        
    }catch(error){
        next(error);
    }
};

export const getHotel = async (req,res,next)=>{
    try{
        const hotel= await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    }catch(error){
        next(error);
    }
};

export const getAllHotel = async (req, res, next) => {
    const {min,max,...other}=req.query
    try {
        const hotels = await Hotel.find(
            {...other,
            cheapestPrice:{$gt : min | 1,$lt : max || 998},}
        ).limit(req.query.limit);
        res.status(200).json(hotels);
    }catch(error){
        next(error);
    }
  };

  export const countByCity = async (req, res, next) => {
      const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }catch(error){
        next(error);
    }
  };

  export const countByType = async (req, res, next) => {
    
  try {
        const countHotel = await Hotel.countDocuments({type:"Hotel"})
        const countApartment = await Hotel.countDocuments({type:"Apartment"})
        const countResort =await Hotel.countDocuments({type:"Resort"})
        const countVilla = await Hotel.countDocuments({type:"Villa"})
        const countCarbin = await Hotel.countDocuments({type:"Carbin"})
      res.status(200).json([
          {type:"Hotel",count:countHotel},
          {type:"Apartment",count:countApartment},
          {type:"Resort",count:countResort},
          {type:"Villa",count:countVilla},
          {type:"Carbin",count:countCarbin}
      ]);
  }catch(error){
      next(error);
  }
};
