import express from "express"
import {updateUser,deleteUser,getUser,getAllUser} from "../controlers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("...");
// });
// router.get("checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("....")
// })
// router.get("/checkadmin",verifyAdmin,(req,res,next)=>{
//     res.send(".....");
// })

//Update User
router.put("/:id",verifyUser,updateUser);


//Delete User
router.delete("/:id",verifyUser,deleteUser);

//Get User

router.get("/:id",verifyUser,getUser)

// Get all User
router.get("/",verifyAdmin,getAllUser)


export default router;

