import React from "react";
import Image from "next/image";
import { Carousel } from "./Carousel";

export default function Home() {
  // Use <Image /> from next/image for optimized loading
  const banners = [
    <div key="slide-1" className="relative w-full h-full flex">
      <Image
        src=""
        alt="Nature"
        width={750}
        height={600}
        className="object-cover w-3/4 h-full"
      />
      <div className="w-1/4 p-4 bg-gray-800 text-white flex flex-col justify-between">
        {/* Streamer Info */}
        <div>
          {/* <Image
            src=""
            alt="BearBoo Avatar"
            width={48}
            height={48}
            className="rounded-full mb-2"
          /> */}
          <h3 className="font-bold">BearBoo</h3>
          <p className="text-sm">The Elder Scrolls IV</p>
        </div>
        {/* Viewers & Tags */}
        <div>
          <p className="text-xs">2.4K viewers</p>
          <div className="flex space-x-1 mt-2">
            <span className="px-2 py-1 bg-purple-600 rounded-full text-xs">
              Cozy
            </span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-xs">
              Neurodivergent
            </span>
          </div>
        </div>
      </div>
    </div>,

    <div key="slide-2" className="relative w-full h-full flex">
      {/* <Image
        src=""
        alt="City"
        width={750}
        height={600}
        className="object-cover w-3/4 h-full"
      /> */}
      <div className="w-1/4 p-4 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          {/* <Image
            src=""
            alt="Viev Avatar"
            width={48}
            height={48}
            className="rounded-full mb-2"
          /> */}
          <h3 className="font-bold">Viev</h3>
          <p className="text-sm">World of Warcraft</p>
        </div>
        <div>
          <p className="text-xs">2.7K viewers</p>
          <div className="flex space-x-1 mt-2">
            <span className="px-2 py-1 bg-pink-600 rounded-full text-xs">
              Girl
            </span>
            <span className="px-2 py-1 bg-green-600 rounded-full text-xs">
              LGBTQ
            </span>
          </div>
        </div>
      </div>
    </div>,

    <div key="slide-3" className="relative w-full h-full flex">
      {/* <Image
        src=""
        alt="Abstract"
        width={750}
        height={600}
        className="object-cover w-3/4 h-full"
      /> */}
      <div className="w-1/4 p-4 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          {/* <Image
            src=""
            alt="BearBreak Avatar"
            width={48}
            height={48}
            className="rounded-full mb-2"
          /> */}
          <h3 className="font-bold">BearBreak</h3>
          <p className="text-sm">Taking A Break!</p>
        </div>
        <div>
          <p className="text-xs">3.1K viewers</p>
          <div className="flex space-x-1 mt-2">
            <span className="px-2 py-1 bg-red-600 rounded-full text-xs">
              Live
            </span>
            <span className="px-2 py-1 bg-yellow-600 rounded-full text-xs">
              Co-op
            </span>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <div>
      <Carousel items={banners} width={1000} height={400} />
    </div>
  );
}
