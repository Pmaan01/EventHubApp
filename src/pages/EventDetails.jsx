import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setCurrentUserId(u ? u.uid : null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const eventDoc = await getDoc(doc(db, "events", eventId));
        if (eventDoc.exists()) {
          // id for delete/edit actions
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          toast.error("Event not found");
          navigate("/events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId, navigate]);

  const handleDelete = async () => {
    if (!event?.id) return;
    const ok = window.confirm("Are you sure you want to delete this event? This cannot be undone.");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "events", event.id));
      toast.success("Event deleted");
      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const isOwner = currentUserId && event.createdBy === currentUserId;

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {event.imageUrl && (
              <div className="relative h-64 w-full">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    event.isPublic ? "bg-green-500 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {event.isPublic ? "Public" : "Private"}
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                  <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>
                </div>

                {isOwner && (
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-900">{event.location || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Time</p>
                    <p className="text-gray-900">{event.startAt ? new Date(event.startAt).toLocaleString() : "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">End Time</p>
                    <p className="text-gray-900">{event.endAt ? new Date(event.endAt).toLocaleString() : "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Capacity</p>
                    <p className="text-gray-900">{event.capacity || "Unlimited"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
