import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Resume() {
  const resumeRef = useRef(null);

  const data = {
    name: "Galvin Alfito",
    title: "Siswa PPLG (Pengembangan Perangkat Lunak & Gim)",
    location: "Nganjuk, Jawa Timur, Indonesia",
    email: "galvinalfito@gmail.com",
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
      {
        role: "Game Developer Beginner",
        place: "Proyek Pribadi",
        year: "2023 - Sekarang",
        desc: "Membuat game 2D sederhana menggunakan Construct 3 dan Unity. Memahami dasar-dasar game development seperti physics, collision detection, dan game logic.",
      },
    ],

    education: {
      school: "SMK",
      major: "PPLG (Pengembangan Perangkat Lunak & Gim)",
      year: "2023 - Sekarang",
    },

    projects: [
      {
        name: "Portfolio Website",
        desc: "Website portfolio interaktif dengan animasi GSAP dan responsive design"
      },
      {
        name: "Game 2D Platformer",
        desc: "Game sederhana dengan Construct 3, memiliki 3 level dan sistem scoring"
      },
      {
        name: "E-commerce Dashboard",
        desc: "Dashboard admin untuk manajemen produk dengan React dan Express"
      },
      {
        name: "Weather App",
        desc: "Aplikasi cuaca real-time menggunakan API dengan React"
      }
    ]
  };

  // Auto-download ketika navigasi dari About section
  useEffect(() => {
    // Cek jika ada trigger auto download dari About section
    const autoDownload = localStorage.getItem('autoDownloadCV');
    if (autoDownload === 'true') {
      // Tunggu sebentar untuk rendering selesai
      setTimeout(() => {
        downloadPDF();
        // Hapus trigger setelah download
        localStorage.removeItem('autoDownloadCV');
      }, 1000);
    }
  }, []);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    // Tampilkan loading
    const loadingText = document.createElement('div');
    loadingText.innerHTML = '⏳ Generating PDF...';
    loadingText.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 20px 40px;
      border-radius: 10px;
      z-index: 9999;
      font-weight: bold;
    `;
    document.body.appendChild(loadingText);

    try {
      // Clone element untuk mencegah perubahan pada UI asli
      const element = resumeRef.current.cloneNode(true);
      
      // Tambahkan class khusus untuk print
      element.classList.add('pdf-version');
      
      // Sembunyikan sementara di DOM
      element.style.cssText = 'position: absolute; left: -9999px; top: 0; width: 794px;';
      document.body.appendChild(element);

      // Konfigurasi html2canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Resolution untuk kualitas lebih baik
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: function(clonedDoc) {
          // Pastikan semua style tetap ada
          clonedDoc.querySelector('.pdf-version').style.cssText = '';
        }
      });

      // Hapus clone
      document.body.removeChild(element);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Hapus loading text
      document.body.removeChild(loadingText);

      // Download PDF
      pdf.save(`Resume_${data.name}_${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      document.body.removeChild(loadingText);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div id="resume" className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-6 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            My <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Resume</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Professional profile, skills, and experiences
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={downloadPDF}
            className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 px-8 rounded-full font-bold text-lg tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 flex items-center gap-3"
          >
            <i className="bx bx-download text-xl"></i>
            Download as PDF
          </button>
        </div>

        {/* Resume Content */}
        <div ref={resumeRef} className="resume-container bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Header dengan foto dan info utama */}
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Foto Profil */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img 
                  src="/profile.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x400/FFA500/FFFFFF?text=GA";
                  }}
                />
              </div>
              
              {/* Info Personal */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.name}</h1>
                <p className="text-lg md:text-xl opacity-90 mb-2">{data.title}</p>
                <p className="opacity-80 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <i className="bx bx-map"></i>
                  {data.location}
                </p>
                
                {/* Kontak Info */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <i className="bx bx-envelope"></i>
                    <span className="text-sm">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="bx bx-phone"></i>
                    <span className="text-sm">{data.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profil Singkat */}
              <section className="border-l-4 border-orange-500 pl-6 py-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="bx bx-user text-orange-500"></i>
                  Profil Singkat
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
              </section>

              {/* Pengalaman */}
              <section className="border-l-4 border-orange-500 pl-6 py-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="bx bx-briefcase text-orange-500"></i>
                  Pengalaman
                </h2>
                <div className="space-y-6">
                  {data.experiences.map((exp, i) => (
                    <div key={i} className="relative pl-6 pb-6 border-l-2 border-gray-300">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
                      <div className="mb-2">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                          <span className="text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full text-sm">
                            {exp.year}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{exp.place}</p>
                      </div>
                      <p className="text-gray-700">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Proyek */}
              <section className="border-l-4 border-orange-500 pl-6 py-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="bx bx-code-alt text-orange-500"></i>
                  Proyek
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.projects.map((project, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                      <h3 className="font-bold text-gray-800 mb-2">{project.name}</h3>
                      <p className="text-gray-700 text-sm">{project.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills */}
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="bx bx-cog text-orange-500"></i>
                  Skills
                </h2>
                <div className="space-y-3">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pendidikan */}
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="bx bx-graduation text-orange-500"></i>
                  Pendidikan
                </h2>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">{data.education.school}</h3>
                  <p className="text-gray-700 font-medium">{data.education.major}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                      {data.education.year}
                    </span>
                  </div>
                </div>
              </section>

              {/* Social Media */}
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="bx bx-link-alt text-orange-500"></i>
                  Portfolio & Social
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="bx bxl-github text-gray-700"></i>
                    <span className="text-gray-700">github.com/galvinalfito</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="bx bxl-linkedin text-blue-600"></i>
                    <span className="text-gray-700">linkedin.com/in/galvinalfito</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="bx bx-globe text-green-600"></i>
                    <span className="text-gray-700">galvinalfito.vercel.app</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Info Tambahan */}
        <div className="text-center mt-10 text-gray-400">
          <p className="text-sm">
            📄 Resume ini juga tersedia untuk dicetak atau disimpan sebagai PDF. 
            Pastikan foto profil sudah terlihat dengan baik sebelum mendownload.
          </p>
        </div>
      </div>

      {/* CSS khusus untuk print/PDF */}
      <style jsx>{`
        .resume-container {
          width: 100%;
          max-width: 794px; /* Lebar A4 dalam pixel */
          margin: 0 auto;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .resume-container, .resume-container * {
            visibility: visible;
          }
          .resume-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            border: none;
          }
        }

        /* Pastikan semua konten bisa dicetak dengan baik */
        @media print {
          .bg-gradient-to-r {
            background: linear-gradient(to right, #f97316, #eab308) !important;
          }
          .text-transparent {
            color: #f97316 !important;
          }
        }
      `}</style>
    </div>
  );
}
