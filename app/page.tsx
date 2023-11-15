"use client";

import { useAuth } from "@pangeacyber/react-auth";
import { v4 as uuidV4 } from 'uuid';
import Link from "next/link";

export default function Home() {
  const { authenticated, login } = useAuth();

  return (
    <div className="container bg-white text-slate-700">
      <div className="left-container">
        <div className="left-container-inner">
          <h1 className="text-6xl text-slate-700">Welcome to Secure Docs</h1>
          <h2 className="text-4xl text-slate-700">
          Create and collaborate on online documents in real-time and from any device with exatra security.
          </h2>
          <h2 className="italic text-blue-500">Powered by Pangea</h2>
        </div>
    
        {authenticated && (
          <>
          <p>
            Please navigate to the <Link href={"/chat"}>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
              Secure ChatGPT

            </button>
              </Link>
          </p>
          <p>
            Please navigate to the <Link href={`/document/${uuidV4()}`}>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
              Document

            </button>
              </Link>
          </p>
          </>
        )}
        {!authenticated && (
          <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => login()}>
            Sign In
          </button>
        )}
      </div>
   
    </div>
  );
}
