// src/app/admin/users/ui/Avatar.tsx
import React from 'react';

type AvatarProps = {
  avatar: string;
};

const Avatar: React.FC<AvatarProps> = ({ avatar }) => (
  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
    {avatar}
  </div>
);

export default Avatar;