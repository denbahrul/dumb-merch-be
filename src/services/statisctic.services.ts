import { prisma } from "@/libs/prisma";

class StatisticServices {
  async summary() {
    const totalProfit = await prisma.order.aggregate({
      _sum: { totalPrice: true },
    });

    const totalProductsSold = await prisma.orderItem.aggregate({
      _sum: { quantity: true },
    });

    const totalBuyers = await prisma.user.count({
      where: { order: { some: {} } },
    });

    const topProduct = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 1,
    });

    const topProductDetail = await prisma.product.findUnique({
      where: { id: topProduct[0].productId },
    });

    const result = {
      totalProfit: totalProfit._sum.totalPrice,
      totalProductsSold: totalProductsSold._sum.quantity,
      totalBuyers: totalBuyers,
      topProduct: topProductDetail?.productName,
    };

    return result;
  }

  async monthlySales() {
    const salesData = await prisma.order.groupBy({
      by: ["createdAt"],
      _sum: { totalPrice: true },
    });

    const monthlySales = salesData.reduce((acc, sale) => {
      const month = sale.createdAt.getMonth(); // 0-11
      acc[month] = (acc[month] || 0) + Number(sale._sum.totalPrice);
      return acc;
    }, Array(12).fill(0));

    return monthlySales;
  }

  async salesByCategory() {
    const categorySales = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
    });

    const categoryData: Record<string, number> = {};

    for (const sale of categorySales) {
      const product = await prisma.product.findUnique({
        where: { id: sale.productId },
        include: {
          category: true,
        },
      });
      const category = product?.category.categoryName || "Uncategorized";
      categoryData[category] = (categoryData[category] || 0) + (sale._sum.quantity || 0);
    }

    return categoryData;
  }
}

export default new StatisticServices();
