import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCalendarPlus,
  faUserPlus,
  faList,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";


const Sidebare = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Récupérer les données de l'utilisateur depuis localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Gérer l'affichage du popup avec les informations de l'utilisateur
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className="w-64 bg-gray-900 flex flex-col justify-between text-white h-[100vh] p-6">
  <nav>
    {/* User Info Section */}
    {userInfo && (
      <>
        <div
          className="flex items-center cursor-pointer mb-6"
          onClick={togglePopup}
        >
          <img
            src={userInfo.profilePhoto.url}
            alt="Profil"
            className="w-14 h-14 object-cover rounded-full border-2 border-gray-600 mr-4"
          />
          <span className="text-lg font-medium">{userInfo.username}</span>
        </div>

        {/* Popup Info */}
        {showPopup && (
          <div className="absolute bg-gray-900 text-white p-4 rounded-lg shadow-lg w-72 border border-gray-700 z-10">
            <div className="flex items-center mb-4">
              <img
                src={userInfo.profilePhoto.url}
                alt="Profil"
                className="w-14 h-14 object-cover rounded-full border-2 border-gray-600 mr-4"
              />
              <h3 className="text-lg font-semibold">Informations personnelles</h3>
            </div>
            <div className="text-sm space-y-2">
              <p>
                <strong className="text-gray-400">Nom d'utilisateur:</strong> {userInfo.username}
              </p>
              <p>
                <strong className="text-gray-400">Administrateur:</strong>{" "}
                <span className={userInfo.isAdmin ? "text-green-400" : "text-red-400"}>
                  {userInfo.isAdmin ? "Oui" : "Non"}
                </span>
              </p>
              <p>
                <strong className="text-gray-400">Date de création:</strong>{" "}
                {new Date(userInfo.createdAt).toLocaleDateString("fr-FR")}
              </p>
              <p>
                <strong className="text-gray-400">Dernière mise à jour:</strong>{" "}
                {new Date(userInfo.updatedAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        )}
      </>
    )}

    {/* Navigation Links */}
    <ul className="space-y-4">
      <li>
        <Link
          to="/Statistique"
          className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faChartBar} className="mr-3" />
          Statistique
        </Link>
      </li>
      <li>
        <Link
          to="/CreateEvenements"
          className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faCalendarPlus} className="mr-3" />
          Create Evenements
        </Link>
      </li>
      <li>
        <Link
          to="/CreateInscriptions"
          className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
          Create Inscriptions
        </Link>
      </li>
      <li>
        <Link
          to="/ListEvenements"
          className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faList} className="mr-3" />
          Liste des événements
        </Link>
      </li>
      <li>
        <Link
          to="/ListParticipants"
          className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Liste des Participants
        </Link>
      </li>
    </ul>
  </nav>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="mt-6 flex items-center justify-center py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded-lg transition"
  >
    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
    Logout
  </button>
</div>

  );
};

export default Sidebare;