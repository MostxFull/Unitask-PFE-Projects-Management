import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page non trouvée</p>
      <p className="mt-2 text-gray-600">La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
