import React from 'react';
import { VercelV0Chat } from '@/components/chat/VercelV0Chat';
import Header from '@/components/Header';

const Chat = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center w-full p-4 pt-8">
        <VercelV0Chat />
      </main>
    </div>
  );
};

export default Chat;