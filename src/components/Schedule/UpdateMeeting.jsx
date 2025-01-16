import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { createMeet, updateMeeting } from "../../features/meetingSlice";
import { useNavigate, useParams } from "react-router";

const UpdateMeeting = ({ token }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.data?._id);
  const { id } = useParams();
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-6">
            Please <span className="font-semibold text-blue-600">register</span>{" "}
            or <span className="font-semibold text-blue-600">log in</span> to
            schedule a meeting.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSchedule = (id) => {
    if (!startTime || !endTime || !title || !description) {
      alert("Please fill out all fields.");
      return;
    }

    const startTimeDate = new Date(date);
    const endTimeDate = new Date(date);

    const [startHours, startMinutes] = startTime.split(":");
    const [endHours, endMinutes] = endTime.split(":");

    startTimeDate.setHours(startHours, startMinutes);
    endTimeDate.setHours(endHours, endMinutes);

    if (endTimeDate <= startTimeDate) {
      alert("End time must be after the start time.");
      return;
    }

    const meetingDetails = {
      title,
      description,
      startTimeDate,
      endTimeDate,
    };

    setError(null);

    dispatch(updateMeeting({ id, title, description, startTime, endTime }))
      .unwrap()
      .then(() => {
        setDate(new Date());
        navigate("/allMeet");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Schedule a Meeting
        </h2>

        <div className="mb-4">
          <Calendar
            value={date}
            onChange={setDate}
            className="w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Meeting Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter meeting title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meeting description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {error && (
          <p className=" text-sm border border-red-200 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <button
          onClick={() => handleSchedule(id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mt-2"
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
};

export default UpdateMeeting;
