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
          {/* Componente Header */}
          <div className="flex justify-between items-center bg-white p-5">
            {/* Logo no canto esquerdo */}
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" width={100} height={100} />
            </div>

            {/* Texto no canto direito */}
            <span className="text-4xl font-bold">Discografia</span>
          </div>

          {/* Listagem dos Álbuns */}
          <AlbumList />
        </div>
      </div>
    </div>
  );
}
