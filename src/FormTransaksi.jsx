// src/FormTransaksi.jsx
import { useState } from "react";

function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");
  const [jenis, setJenis] = useState("Pemasukan");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keterangan.trim() || !nominal || Number(nominal) <= 0) return;

    onTambah({
      id: Date.now(),
      keterangan: keterangan.trim(),
      nominal: Number(nominal), // Mengubah teks input menjadi angka
      jenis: jenis,
    });

    setKeterangan("");
    setNominal("");
    setJenis("Pemasukan");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <div>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "4px",
            fontWeight: "bold",
          }}
        >
          Keterangan
        </label>
        <input
          className="input"
          type="text"
          placeholder="Contoh: Gaji Bulanan / Makan Siang"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "4px",
            fontWeight: "bold",
          }}
        >
          Nominal (Rp)
        </label>
        <input
          className="input"
          type="number"
          placeholder="Contoh: 50000"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "4px",
            fontWeight: "bold",
          }}
        >
          Jenis Transaksi
        </label>
        <select
          className="input"
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: "#FFFFFF",
          }}
        >
          <option value="Pemasukan">Pemasukan</option>
          <option value="Pengeluaran">Pengeluaran</option>
        </select>
      </div>

      <button className="tombol" type="submit" style={{ marginTop: "4px" }}>
        Tambah Transaksi
      </button>
    </form>
  );
}

export default FormTransaksi;
