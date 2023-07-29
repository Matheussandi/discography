import { AddAlbum } from "@/components/AddAlbum";
import ImageBackground from "../../assets/background.png";
import Logo from "../../assets/logo.png";

import Image from "next/image";

export default function Album() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image src={ImageBackground} alt="background image" fill />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="p-5">
          {/* Componente Header */}
          <div className="flex justify-between items-center bg-white p-5">
            {/* Logo no canto esquerdo */}
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" width={100} height={100} />
            </div>

            {/* Texto no canto direito */}
            <span className="text-4xl font-bold">Discografia</span>
          </div>

          {/* Adicionar Álbum */}
          <div className="bg-white bg-opacity-80 px-5 py-2">
            <AddAlbum />
          </div>
        </div>
      </div>
    </div>
  );
}
