"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/lib/api";

export function AddAlbum() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cria um objeto com dados do álbum
    const albumData = {
      name,
      year,
    };

    try {
      const token = "matheussandi@hotmail.com";

      // Envia dados para a rota desejada usando o método POST
      const response = await api.post("/album", albumData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        router.push("/");
      } else {
        // Lida com erro de envio
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
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none"
        >
          Adicionar
        </button>
      </form>
    </>
  );
}