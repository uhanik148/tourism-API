import React from "react";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<"payment" | "wisata" | null>(null);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#2c3e50",
          fontSize: "2.5rem",
          marginBottom: "20px",
        }}
      >
        Selamat Datang di Website Kami
      </h1>
      <p
        style={{
          color: "#34495e",
          fontSize: "1.2rem",
          marginBottom: "30px",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Kami senang Anda mengunjungi website kami. Jelajahi informasi menarik tentang Wisata Sirah Kencong dan layanan yang kami tawarkan untuk membantu Anda!
      </p>

      {selectedOption === "payment" ? (
        <div className="payment-section">
          {/* Konten untuk Pembayaran */}
          <div className="card">
            <h3>Pembayaran</h3>
            <p>
              Silakan lanjutkan ke pembayaran untuk memproses transaksi Anda.
            </p>
            <button
              style={{
                backgroundColor: "#3498db",
                color: "white",
                fontSize: "1rem",
                padding: "10px 20px",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
              onClick={() => alert("Melanjutkan ke Midtrans payment gateway...")}
            >
              Lanjutkan Pembayaran
            </button>
          </div>
        </div>
      ) : selectedOption === "wisata" ? (
        <div className="wisata-section">

          {/* Konten untuk Wisata */}
          <div className="card">
            <h3>Wisata A</h3>
            <p>Deskripsi singkat tentang wisata A.</p>
            <a href="#" className="button">
              Selengkapnya
            </a>
          </div>
          <div className="card">
            <h3>Wisata B</h3>
            <p>Deskripsi singkat tentang wisata B.</p>
            <a href="#" className="button">
              Selengkapnya
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* Tombol untuk memilih */}
          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              fontSize: "1rem",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
            onClick={() => setSelectedOption("payment")}
          >
            Pembayaran
          </button>

          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              fontSize: "1rem",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedOption("wisata")}
          >
            Tentang Wisata
          </button>
        </div>
      )}
    </div>
  );
}
