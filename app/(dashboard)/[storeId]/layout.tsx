import {auth} from "@/auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import {Navbar} from "@/app/_components/Navbar/navbar";
import {MainNav} from "@/app/_components/Navbar/main-nav";

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