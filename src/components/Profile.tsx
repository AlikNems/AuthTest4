import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user, token } = useAuth();

  if (!token) {
    return <p>Пожалуйста, войдите в систему.</p>;
  }

  return (
    <div>
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Профиль</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div className="flex flex-col">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">ID:</span>
                <span className="font-medium">{user.id}</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Загрузка...</p> // Показываем загрузку, если данных нет
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
