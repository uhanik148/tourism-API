import React from "react";

const PaymentPage = () => {
  return (
    <div>
      <h1>Pembayaran</h1>
      <p>Silakan lanjutkan ke pembayaran untuk memproses transaksi Anda.</p>
      {/* Di sini bisa diintegrasikan dengan Midtrans Snap */}
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
        onClick={() => alert("Melanjutkan ke Midtrans payment gateway...")}
      >
        Lanjutkan Pembayaran
      </button>
    </div>
  );
};

export default PaymentPage;
