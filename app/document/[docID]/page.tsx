/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "quill/dist/quill.snow.css"
import "./TextEditor.css"
import dynamic from 'next/dynamic';


  const QuillNoSSRWrapper = dynamic(
    () => import('./QuillWrapper'),
    { ssr: false }
  );

const TextEditor = ({ params }) => {
  const docID = params.docID;
  console.log("docId", docID);

  if (!docID) {
    
    return <div>No document ID provided</div>;
  }
  
    return(
      <div className="container">
      <QuillNoSSRWrapper documentId={docID}/>
      </div>
    ) 
}

export default TextEditor
