"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/lib/api";
import Link from "next/link";

export function AddAlbum() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const albumData = {
      name,
      year,
    };

    try {
      const token = "matheussandi@hotmail.com";

      const response = await api.post("/album", albumData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        router.push("/");
      } else {
        console.error("Erro ao enviar dados.");
      }
    } catch (error) {
      console.error("Erro de solicitação:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-72 mx-auto mt-8">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Nome do álbum
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Ano do álbum
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-around gap-2">
          <Link
            href="/"
            className="w-1/2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none flex items-center justify-center"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="w-1/2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none"
          >
            Adicionar
          </button>
        </div>
      </form>
    </>
  );
}
