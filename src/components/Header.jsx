import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function Header() {
  const name = useSelector((state) => state.user.data?.name); // Fetch the user's name from Redux store

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-stone-900 text-white">
        <h2>MEETING APP</h2>
        <nav className="flex gap-4 text-sm">
          {/* Conditionally render links based on login status */}
          {!name && (
            <>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
          {name && (
            <>
              <Link to="/schedule" className="hover:underline">
                Schedule
              </Link>
              <Link to="/allMeet" className="hover:underline">
                All Meetings
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
