import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server"; //This function retrieves the currently signed-in user from Clerk on the server side

export default async function HomePage() {
  //This is the main page component that renders when someone visits the homepage (/)
  const user = await currentUser(); //This returns the user object if someone is logged in, or null if not.

  if (!user) {
    //If there is no user, it means the user is not logged in
    //So we return the Guest component which is a public page for users who are not logged
    return <Guest />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome back, {user.firstName}!</h1>
    </div>
  );
}
