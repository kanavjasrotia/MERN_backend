import jwt from "jsonwebtoken";
import "dotenv/config";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { HttpErrorsData } from "../../core/data/httpError.data";

export const checkToken = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let response = {
      success: false,
      msg: errors.array()[0].msg,
    };
    return res.status(400).json(response);
  }

  const token = req.body.token;

  try {
    const decoded = jwt.verify(token, process.env.secret);
    res.json({ success: true });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.json({ success: false, msg: "Token expired" });
    }
    res.status(500).json({ success: false, msg: "Invalid token" });
  }
};
