import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import EventForm from "../components/EventForm";
import AuthLayout from "../components/AuthLayout";
import { createEvent } from "../services/eventService";
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';

export default function CreateEvent() {
  const auth = useAuth();
  if (!auth)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking auth...
      </div>
    );
  const { user } = auth;

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startAt: "",
    endAt: "",
    capacity: "",
    isPublic: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.title || !form.description || !form.startAt) {
      toast.error("Please enter title, description and start date/time");
      return false;
    }
    const start = new Date(form.startAt);
    if (isNaN(start.getTime())) {
      toast.error("Invalid start date/time");
      return false;
    }
    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be signed in to create events");
      return;
    }
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location || "",
        startAt: new Date(form.startAt).toISOString(),
        endAt: form.endAt ? new Date(form.endAt).toISOString() : null,
        capacity: form.capacity ? Number(form.capacity) : null,
        isPublic: !!form.isPublic,
        createdBy: user.uid,
      };
      const id = await createEvent(payload, imageFile);
      toast.success("Event created");
      navigate(`/events/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <AuthLayout>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Create an event</h2>
          <p className="text-sm text-gray-500">Fill in the details below</p>
        </div>

        <EventForm
          form={form}
          setForm={setForm}
          imageFile={imageFile}
          setImageFile={setImageFile}
          onSubmit={handleCreate}
          loading={loading}
        />
      </AuthLayout>
          <Footer />
    </div>
  );
}
