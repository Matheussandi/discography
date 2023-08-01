import Image from "next/image";

import ImageBackground from "../assets/background.png";
import Logo from "../assets/logo.png";

import { AlbumList } from "@/components/AlbumList";

export default async function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image src={ImageBackground} alt="background image" fill />
      </div>
      <div className="relative z-1 flex flex-col items-center justify-center h-full">
        <div className="p-5 w-full md:w-4/5">
          <div className="flex justify-between items-center bg-white p-5">
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" width={150} height={150} />
            </div>

            <span className="text-4xl text-gray-500">Discografia</span>
          </div>

          <AlbumList />
        </div>
      </div>
    </div>
  );
}
