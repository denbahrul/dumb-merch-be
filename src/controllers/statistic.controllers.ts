import statiscticServices from "@/services/statisctic.services";
import { Request, Response } from "express";

class StatisticControllers {
  async static(req: Request, res: Response) {
    try {
      const summary = await statiscticServices.summary();
      const monthlySales = await statiscticServices.monthlySales();
      const salesByCategory = await statiscticServices.salesByCategory();

      res.json({
        summary,
        monthlySales,
        salesByCategory,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new StatisticControllers();
