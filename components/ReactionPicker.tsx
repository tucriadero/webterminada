'use client';

import { useState } from 'react';

const emojis = ['👍', '❤️', '😂', '😮', '😢'];

export default function ReactionPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  return (
    <div className="absolute z-10 -top-10 left-1/2 -translate-x-1/2 bg-white border rounded-full shadow p-1 flex gap-1">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-xl hover:scale-110 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
