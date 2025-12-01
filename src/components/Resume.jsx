import React from "react";

// Resume khusus Jurusan PPLG (Pengembangan Perangkat Lunak & Gim)
// Siap dipakai untuk website portfolio atau di-print ke PDF

export default function Resume() {
  const data = {
    name: "Galvin Alfito",
    title: "Siswa PPLG (Pengembangan Perangkat Lunak & Gim)",
    location: "Nganjuk, Jawa Timur, Indonesia",
    email: "galvin@example.com",
    phone: "0856-4752-7381",
    summary:
      "Siswa jurusan PPLG yang fokus pada pengembangan website dan game. Terbiasa menggunakan HTML, CSS, JavaScript, React, serta membuat game 2D menggunakan Construct 3. Memiliki minat besar di bidang teknologi, pemrograman, dan pengembangan produk digital.",

    skills: [
      "HTML, CSS, JavaScript",
      "React + Tailwind CSS",
      "Node.js & Express dasar",
      "Construct 3 (Game 2D)",
      "Unity (Pemula)",
      "Git & GitHub Dasar",
      "UI/UX Design (Figma)",
      "Gsap",
      "Next.js",
    ],

    experiences: [
      {
        role: "Web Developer (Latihan)",
        place: "Sekolah / Proyek Pribadi",
        year: "2024 - Sekarang",
        desc: "Membangun website menggunakan React, Tailwind CSS, dan Express. Membuat fitur login, CRUD data, dan dashboard admin sederhana.",
      },
    ],

    education: {
      school: "SMK",
      major: "PPLG (Pengembangan Perangkat Lunak & Gim)",
      year: "2023 - Sekarang",
    },
  };

  return (
    <div id="Resume" className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-sm mt-1">{data.title}</p>
          <p className="text-xs mt-1 opacity-80">{data.location}</p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left */}
          <div className="md:col-span-2">
            <section className="mb-5">
              <h2 className="font-semibold text-lg mb-2">Profil Singkat</h2>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </section>

            <section className="mb-5">
              <h2 className="font-semibold text-lg mb-2">Pengalaman</h2>
              <div className="space-y-3">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="border p-4 rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{exp.role}</h3>
                      <span className="text-xs opacity-70">{exp.year}</span>
                    </div>
                    <p className="text-xs opacity-80">{exp.place}</p>
                    <p className="text-sm mt-2">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-2">Proyek</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {data.projects.map((p, i) => (
                  <li key={i}>
                    <strong>{p.name}</strong> — {p.desc}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Kontak</h3>
              <p className="text-sm">Email: {data.email}</p>
              <p className="text-sm">HP: {data.phone}</p>
            </section>

            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Skill</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs border px-2 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Pendidikan</h3>
              <p className="text-sm font-medium">{data.education.school}</p>
              <p className="text-sm">{data.education.major}</p>
              <p className="text-xs opacity-70">{data.education.year}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}