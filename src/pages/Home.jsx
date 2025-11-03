import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard.jsx';
import EventList from '../components/EventList';
import EmptyState from '../components/EmptyState.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'events'), orderBy('startAt', 'desc'), limit(12));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(items);
      } catch (err) {
        console.error('Failed to load events', err);
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Dashboard
          onCreate={() => navigate('/create-event')}
          totalEvents={events.length}
        />

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent events</h2>

          {loading ? (
            <div className="py-12 text-center">Loading events…</div>
          ) : events.length === 0 ? (
            <EmptyState
              title="No events yet"
              message="Create your first event to see it here."
              actionLabel="Create event"
              onAction={() => navigate('/create-event')}
            />
          ) : (
            <EventList events={events} />
          )}
        </section>
      </div>
          <Footer />
    </div>
  );
}
