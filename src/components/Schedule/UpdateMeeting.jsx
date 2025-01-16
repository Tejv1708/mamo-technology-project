import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { updateMeeting, getAllMeeting } from "../../features/meetingSlice";

const UpdateMeeting = ({ token }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meeting = useSelector((state) =>
    state?.meeting?.data?.find((meeting) => meeting._id === id)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTimeDate, setStartTimeDate] = useState("");
  const [endTimeDate, setEndTimeDate] = useState("");

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title);
      setDescription(meeting.description);
      setStartTimeDate(
        new Date(meeting.startTimeDate).toISOString().slice(0, 16)
      );
      setEndTimeDate(new Date(meeting.endTimeDate).toISOString().slice(0, 16));
    }
  }, [meeting]);

  const handleUpdate = () => {
    const updatedMeeting = {
      id,
      title,
      description,
      startTimeDate: new Date(startTimeDate),
      endTimeDate: new Date(endTimeDate),
    };

    dispatch(updateMeeting({ token, updatedMeeting }))
      .unwrap()
      .then(() => {
        navigate("/allMeet");
      })
      .catch((err) => console.error("Error updating meeting:", err));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Update Meeting</h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="datetime-local"
            value={startTimeDate}
            onChange={(e) => setStartTimeDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="datetime-local"
            value={endTimeDate}
            onChange={(e) => setEndTimeDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Update Meeting
        </button>
      </div>
    </div>
  );
};

export default UpdateMeeting;
