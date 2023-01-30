import express from "express";
import authMiddleware from "../../middleware/auth/verifyToken.js";
import Location from "../../models/location/index.js";
import { errorMiddleware, locationValidation } from "../../middleware/validation/index.js";


const router = express.Router();

router.post("/", authMiddleware, locationValidation(), errorMiddleware, async (req, res) => {
    try {
  
      const payload = req.payload;
      // console.log(payload);
      if (!payload) {
        return res.status(401).json({ error: "Unauthorised Access" });
      }
  
      //Check Req.body1000000
      let { name, locationName } = req.body;
  
      let locationData = await Location.findOne({ user: payload.user_id }).populate("user", ["name", "userId", "email"]);
      // console.log(locationData);
  
      let location_data = {
        name,
        locationName,
        isAdded: false,
      };

      console.log("----------",location_data)

      console.log("----------",locationData)
  
      locationData.location.push(location_data);
  
      await locationData.save();
      res.status(200).json({ success: "Location Added Successfully" });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  export default router;

  