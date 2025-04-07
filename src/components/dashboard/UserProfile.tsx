"use client";

import Image from 'next/image';
import React from 'react';

interface UserProfileProps {
  name: string;
  email: string | null;
  image: string | null;
}

export function UserProfile({ name, email, image }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={name || '사용자'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span className="text-xl">👤</span>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-lg">{name || '사용자'}</h2>
          <p className="text-sm text-gray-500">{email || ''}</p>
        </div>
      </div>
    </div>
  );
} 