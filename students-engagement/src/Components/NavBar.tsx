import { Link } from '@tanstack/react-router';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-white font-bold text-lg">Students Engagement</span>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md"
            activeProps={{ className: "bg-gray-900 text-white" }}
          >
            Home
          </Link>
          <Link
            to="/attendance"
            className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md"
            activeProps={{ className: "bg-gray-900 text-white" }}
          >
            Attendance
          </Link>

          <Link
            to="/attendance"
            className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md"
            activeProps={{ className: "bg-gray-900 text-white" }}
          >
            Quizzes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
