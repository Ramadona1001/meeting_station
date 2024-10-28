"use client";
import logo from '@assets/logo.png';
import { useState, useEffect } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState("block");
  useEffect(() => {
    setLoading(true)
    setShow("block")
    setTimeout(() => {
      setLoading(false);
      setShow("none")
    }, 3000); 
  }, []);
  return (
    <>
      <div className={`preloader ${loading ? '' : 'page-loaded'}`} style={{display:show}}>
        <div className="icon" style={{backgroundImage: `url(${logo.src})`}} ></div>
      </div>
    </>
  );
}