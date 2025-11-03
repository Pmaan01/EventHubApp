import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EventSummaryCard({ event }) {
  const navigate = useNavigate();
  const start = event?.startAt ? new Date(event.startAt).toLocaleString() : 'TBA';
  
  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            event.isPublic 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-800/90 text-white'
          }`}>
            {event.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {event.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-xs font-medium">{start}</span>
          </div>
          
          {event.location && (
            <div className="flex items-center gap-1 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-xs truncate max-w-[100px]">{event.location}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1 text-indigo-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View Details</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
