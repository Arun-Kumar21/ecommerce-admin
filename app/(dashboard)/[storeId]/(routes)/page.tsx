import PageHeader from "@/app/_components/heading";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {BarChartBig, CreditCard, DollarSign, Package} from "lucide-react";
import {formatter} from "@/lib/utils";
import {getTotalRevenue} from "@/actions/get-totalRevenue";
import {getSalesCount} from "@/actions/get-sales-count";
import {getTotalProductInStore} from "@/actions/getTotalProductInStore";
import Overview from "@/app/_components/overview";
import {getGraphData} from "@/actions/get-graph-data";

const DashboardPage =  async ({params} : {params : {storeId : string}}) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSalesCount = await getSalesCount(params.storeId);
  const totalProductInStock = await getTotalProductInStore(params.storeId);

  const graphRevenue = await getGraphData(params.storeId);

  return (
    <div className="p-4 md:mx-12">
      <div className="flex items-center justify-between pb-2">
        <PageHeader title="Dashboard" description="Overview of your store"/>
      </div>
      <Separator/>

      <div className="grid gap-4 grid-cols-3 mt-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-1">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {formatter.format(totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-1">
            <CardTitle className="text-sm font-medium">
              Product In Store
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalProductInStock}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-1">
            <CardTitle className="text-sm font-medium">
              Sales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              +{totalSalesCount}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="flex flex-row justify-between items-center space-y-1">
            <CardTitle className="text-sm font-medium">
              Overview
            </CardTitle>
            <BarChartBig className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>

          <CardContent className="pl-2">
            <Overview
              data={graphRevenue}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage;