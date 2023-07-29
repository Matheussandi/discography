"use client";

import { api } from "@/lib/api";
import { useState } from "react";

interface AlbumData {
  name: string;
  year: string;
}

export function AddAlbum() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [jsonSent, setJsonSent] = useState<AlbumData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create an object with album data
    const albumData = {
      name,
      year,
    };

    try {
      const token = "matheussandi@hotmail.com"; // Substitua pelo token de acesso válido

      // Send data to the desired route using the POST method
      const response = await api.post("/album", albumData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        // Data sent successfully (200 OK status)
        console.log("Data sent successfully!");
        setJsonSent(albumData);
        setSubmitted(true);
      } else {
        // Handle sending error
        console.error("Error while sending data.");
      }
    } catch (error) {
      console.error("Request error:", error);
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
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Cadastrar
        </button>
      </form>

      {/* Show the sent data */}
      {submitted && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sent Data:</h2>
          <pre>{JSON.stringify(jsonSent, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
