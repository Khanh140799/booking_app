import express from "express"
import Hotel from "../modules/Hotel.js"
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controlers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create Hotel
router.post("/",verifyAdmin,createHotel)

//Update Hotel
router.put("/:id",verifyAdmin,updateHotel);


//Delete Hotel
router.delete("/:id",verifyAdmin,deleteHotel);

//Get Hotel

router.get("/find/:id",getHotel);

// Get all Hotel
router.get("/",getAllHotel);

router.get("/countByCity",countByCity);

router.get("/countByType",countByType);


export default router