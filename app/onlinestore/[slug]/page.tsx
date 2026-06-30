"use client";

import Aboutstore from "@/components/aboutstore";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";


export default function Page({ params }: { params: Promise<{ slug: string }> } , storeId: string) {
    const { slug } = React.use(params);
  // const [storeData, setStoreData] = useState<any>(null);
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <Aboutstore storeId = {slug} /> 
    </div>
  );
}
