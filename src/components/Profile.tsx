import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
 const { user, token, logout } = useAuth();

 if (!token) {
  return <p>Пожалуйста, войдите в систему.</p>;
 }

 return (
  <div className="w-full h-full flex items-center justify-center bg-gray-700">
   <Card className="w-[40%] h-[55%] bg-gray-400">
    <CardHeader>
     <CardTitle className="text-3xl font-semibold text-center">
      Profile
     </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     {user ? (
      <>
       <div className="flex flex-col">
        <span className="text-gray-600">Email:</span>
        <span className="font-medium text-gray-900 border p-2 rounded-md mt-1">{user.email}</span>
       </div>
       <div className="flex flex-col mt-4">
        <span className="text-gray-600">ID:</span>
        <span className="font-medium text-gray-900 border p-2 rounded-md mt-1">{user.id}</span>
       </div>

       <Button
        variant="secondary"
        size="lg"
        onClick={logout}
        className="mt-6 w-full bg-gray-600 hover:bg-gray-500 hover:scale-105 transition-colors transition-transform duration-300 "
       >
        Logout
       </Button>
      </>
     ) : (
      <p className="text-gray-500">Loading...</p>
     )}
    </CardContent>
   </Card>
  </div>
 );
};

export default Profile;
