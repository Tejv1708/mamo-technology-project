import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAMeeting, getAllMeeting } from "../../features/meetingSlice";
import { useNavigate } from "react-router";

const AllMeeting = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all meetings initially and after each deletion
  useEffect(() => {
    fetchMeetings();
  }, [dispatch]);

  const fetchMeetings = () => {
    dispatch(getAllMeeting())
      .unwrap()
      .then((res) => console.log("Fetched meetings:", res))
      .catch((err) => console.log("Error fetching meetings:", err));
  };

  const allMeeting = useSelector((state) => state.meeting);

  const handleDelete = (id) => {
    dispatch(deleteAMeeting({ token, id }))
      .unwrap()
      .then(() => {
        // Fetch updated list after successful deletion
        fetchMeetings();
      })
      .catch((err) => console.error("Error deleting meeting:", err));
  };

  function handleRedirect() {
    navigate("/schedule");
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Meetings</h1>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        {allMeeting?.data?.length > 0 ? (
          <ul className="space-y-4">
            {allMeeting?.data?.map((meeting) => (
              <li
                key={meeting._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {meeting.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {meeting.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Name:{" "}
                    <span className="font-medium">{meeting.author.name}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Duration:{" "}
                    <span className="font-medium">
                      {new Date(meeting.startTimeDate).toLocaleString()} -{" "}
                      {new Date(meeting.endTimeDate).toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex gap-2">
                  {/* <button
                    onClick={() => handleUpdateRedirect(meeting._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button> */}
                  <button
                    onClick={() => handleDelete(meeting._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">
            No meetings scheduled yet.
            <button
              onClick={handleRedirect}
              className="text-blue-500 underline ml-2"
            >
              Create
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AllMeeting;
