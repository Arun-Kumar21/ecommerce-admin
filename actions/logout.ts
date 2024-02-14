"use server"

import {auth, signOut} from "@/auth";

const LogoutAction = async() => {
  const session = await auth();

  // TODO : FIX NEXT_AUTH ERROR OCCUR DURING LOGOUT

  try {
    await signOut();

  } catch (error) {
    console.log("Logout_action" , error);
  }
}

export default LogoutAction;