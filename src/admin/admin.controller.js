import { response, request } from "express";
import bcryptjs from 'bcryptjs';

import adminModel from "./admin.model.js";


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
      const user = new adminModel({ name, email, password});
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);
      
      await user.save();
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };