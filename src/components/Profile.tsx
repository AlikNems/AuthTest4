import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Изменено

const Profile = () => {
  const { user, token, logout } = useAuth();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Добавлено состояние для видимости
  const navigate = useNavigate(); // Используем навигацию вместо <Link>

  // Этот useEffect активирует анимацию появления после первого рендера
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Появление карточки после монтирования
    }, 100); // Задержка для плавности анимации (можно настроить)

    return () => clearTimeout(timer); // Очистка таймера
  }, []);

  if (!token) {
    return <p>Пожалуйста, войдите в систему.</p>;
  }

  const handleLogOutClick = () => {
    setIsFadingOut(true); // Запускаем эффект исчезновения

    // Выполняем выход сразу, а редирект — после завершения анимации
    setTimeout(() => {
      logout(); // Выполняем выход
      navigate("/login"); // Переходим на страницу логина после анимации
    }, 800); // Убедитесь, что время совпадает с длительностью анимации
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

export default Profile; // 🔹 Добавлен экспорт, если его не было
