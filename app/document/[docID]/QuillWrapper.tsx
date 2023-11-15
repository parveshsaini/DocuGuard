"use client";

import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  const QuillWrapper = ({ documentId }) => {
    const quillRef = useRef(null);
    const editorRef = useRef(null);
    const containerRef = useRef<any | undefined>();
    const [socket, setSocket] = useState<any | undefined>();


    useEffect(() => {
      const s = io("http://localhost:3001");
      setSocket(s);
      console.log("socket connected", s);
  
      return () => {
        s.disconnect()
      }
    }, [])

    useEffect(() => {
      if (!socket || !quillRef.current) return;
  
      socket.once("load-document", document => {
        console.log("document is loaded");
        quillRef.current.setContents(document);
        quillRef.current.enable();
      });
  
      socket.emit("get-document", documentId);
    }, [socket, documentId]);

    useEffect(() => {
      if (socket == null || quillRef.current == null) return;
  
      const interval = setInterval(() => {
        socket.emit("save-document", quillRef.current.getContents());
      }, 2000);
  
      return () => {
        clearInterval(interval);
      };
    }, [socket]);
  
    useEffect(() => {
      if (socket == null || quillRef.current == null) return;
  
      const handler = (delta) => {
        quillRef.current.updateContents(delta);
      };
      socket.on("receive-changes", handler);
  
      return () => {
        socket.off("receive-changes", handler);
      };
    }, [socket]);
  
    useEffect(() => {
      if (socket == null || quillRef.current == null) return;
  
      const handler = (delta, oldDelta, source) => {
        if (source !== "user") return;
        socket.emit("send-changes", delta);
      };
      quillRef.current.on("text-change", handler);
  
      return () => {
        quillRef.current.off("text-change", handler);
      };
    }, [socket]);
  
  

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        editorRef.current = document.createElement('div');
        containerRef.current.appendChild(editorRef.current);
  
        const q = new Quill(editorRef.current, {
          theme: 'snow',
          modules: { toolbar: TOOLBAR_OPTIONS },
        });
        q.disable();
        q.setText('Loading...');
        quillRef.current = q;
      }
    }, []);
  
    return <div id="quill-editor" ref={containerRef}></div>;
};

export default QuillWrapper;
