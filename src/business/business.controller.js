import { response, request } from "express";
import businessModel from "./business.model.js";





export const businessPOST = async (req, res) => {
    const { name, impactLevel, yearsOfExperience, category } = req.body;
        
      const business = new businessModel({ name, impactLevel, yearsOfExperience, category });
      
      await business.save();
  
      res.status(200).json({
        business,
      });
    
  };
