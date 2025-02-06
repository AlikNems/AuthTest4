import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token, logout } = useAuth();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!token) {
    return <p>Пожалуйста, войдите в систему.</p>;
  }

  const handleLogOutClick = () => {
    setIsFadingOut(true);


    setTimeout(() => {
      logout();
      navigate("/login");
    }, 800);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-700">
      <Card className={`card3 ${isVisible ? "visible" : ""} ${isFadingOut ? "fade-out" : ""}`}>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">Profile</CardTitle>
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
                onClick={handleLogOutClick}
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
