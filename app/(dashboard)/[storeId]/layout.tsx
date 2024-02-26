import {auth} from "@/auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import {MainNav} from "@/app/_components/Navbar/main-nav";
import toast from "react-hot-toast";

export default async function DashBoardLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { storeId: string }
}){
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        redirect("/");
    }

    //@ts-ignore
    if (session?.user.role !== "ADMIN") {
        return (
          <div className="w-full h-screen flex items-center justify-center">
              <h1 className="text-muted-foreground text-xl font-semibold uppercase">
                  Admins can only access dashboards
              </h1>
          </div>
        );
    }

    const { storeId } = params;

    const store = await db.store.findFirst({
        where : {
            id : storeId,
            userId
        }
    })

    if (!store) {
        redirect("/");
    }

    return (
        <>
          <MainNav />
          {children}
        </>
    )

}