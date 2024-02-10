import {auth} from "@/auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import {Navbar} from "@/app/_components/Navbar/navbar";
import {Sidebar} from "@/app/_components/Navbar/Sidebar";

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
            <div>
                <Sidebar />
            </div>

            <div>
                <Navbar />
            </div>

            <div className={"md:ml-56 p-4"}>
                {children}
            </div>
        </>
    )

}