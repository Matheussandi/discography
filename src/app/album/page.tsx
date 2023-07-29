import Image from "next/image";
import Link from "next/link";

import ImageBackground from "../../assets/background.png";
import Logo from "../../assets/logo.png";

import { AddAlbum } from "@/components/AddAlbum";

export default function Album() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image src={ImageBackground} alt="background image" fill />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="p-5">
          <Link
            href="/"
            className="flex justify-center items-center bg-white p-5"
          >
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>

          <div className="bg-white bg-opacity-80 px-5 py-2">
            <AddAlbum />
          </div>
        </div>
      </div>
    </div>
  );
}