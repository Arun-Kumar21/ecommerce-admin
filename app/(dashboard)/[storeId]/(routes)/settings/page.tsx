import {redirect} from "next/navigation";
import PageHeader from "@/app/_components/heading";
import ModifyStore from "@/app/_components/modify-store";
import db from "@/lib/db";
import {auth} from "@/auth";

const UserSettings = async ({
  params
} : { params : { storeId : string } }) => {

  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const store = await db.store.findFirst({
    where : {
      id : params.storeId
    }
  })

  if (!store) {
    redirect("/");
  }

  return (
    <div className={"p-4 md:ml-12"}>
      <PageHeader title={"Settings"}  description={"Manage store preference"} />

      <div className={"my-8 border-[1px] p-4 md:pr-8 lg:w-1/2 rounded-md"}>
        <ModifyStore initialData={store} />
      </div>
    </div>
    )
}

export default UserSettings;