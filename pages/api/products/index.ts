import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTES } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;
  
  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTES.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }

  await db.connect;
  
  try {
     const products = await Product.find(condition)
    .select("title images price inStock slug -_id")
    .lean();
    console.log(1)
    return res.status(200).json(products);
  } catch (error) {
    console.log(error)
  }
  
  await db.disconnect;

  
};
