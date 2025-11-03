import React from 'react';

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onAction && (
        <button onClick={onAction} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          {actionLabel || 'Action'}
        </button>
      )}
    </div>
  );
}
