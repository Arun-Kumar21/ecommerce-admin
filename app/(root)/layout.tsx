import {auth} from "@/auth";
import {redirect} from "next/navigation";
import db from "@/lib/db";

export default async function HomeLayout({
    children
}: { children : React.ReactNode}) {
        const session = await auth();
        const userId = session?.user?.id;

        // const router.push

        if (!userId) {
            redirect("/login");
        }

        const store = await db.store.findFirst({
            where : {
                userId
            }
        });

        if (store) {
            redirect(`/${store.id}`);
        }

        return (
            <>
                {children}
            </>
        )
}