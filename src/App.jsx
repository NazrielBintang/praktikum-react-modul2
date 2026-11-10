// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Kartu from "./Kartu";
import FormTransaksi from "./FormTransaksi";
import ItemTransaksi from "./ItemTransaksi";

function App() {
  const [transaksiList, setTransaksiList] = useState(() => {
    const dataTersimpan = localStorage.getItem("catatan-keuangan");
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      {
        id: 1,
        keterangan: "Gaji Bulanan",
        nominal: 4500000,
        jenis: "Pemasukan",
      },
      {
        id: 2,
        keterangan: "Makan Siang & Kopi",
        nominal: 75000,
        jenis: "Pengeluaran",
      },
    ];
  });

  const tambahTransaksi = (transaksiBaru) => {
    setTransaksiList([transaksiBaru, ...transaksiList]);
  };

  const hapusTransaksi = (id) => {
    setTransaksiList(transaksiList.filter((t) => t.id !== id));
  };

  // Perhitungan total otomatis dari state
  const totalPemasukan = transaksiList
    .filter((t) => t.jenis === "Pemasukan")
    .reduce((acc, t) => acc + t.nominal, 0);

  const totalPengeluaran = transaksiList
    .filter((t) => t.jenis === "Pengeluaran")
    .reduce((acc, t) => acc + t.nominal, 0);

  const totalSaldo = totalPemasukan - totalPengeluaran;

  // Efek samping: sinkronisasi judul tab dan localStorage
  useEffect(() => {
    document.title = `Saldo: Rp ${totalSaldo.toLocaleString("id-ID")}`;
  }, [totalSaldo]);

  useEffect(() => {
    localStorage.setItem("catatan-keuangan", JSON.stringify(transaksiList));
  }, [transaksiList]);

  return (
    <div className="wadah">
      <h1 className="judul">Catatan Keuangan Mini</h1>
      <p className="subjudul">
        Praktikum Modul 2: React Lanjutan (Tugas Terstruktur)
      </p>

      {/* Kartu Ringkasan Saldo */}
      <Kartu judul="Ringkasan Keuangan">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: "13px", color: "#687280" }}>
              Total Saldo
            </p>
            <h2
              style={{
                margin: "4px 0 0",
                color: totalSaldo >= 0 ? "#1B365D" : "#DC2626",
              }}
            >
              Rp {totalSaldo.toLocaleString("id-ID")}
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#10B981",
                fontWeight: "bold",
              }}
            >
              Pemasukan: Rp {totalPemasukan.toLocaleString("id-ID")}
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "12px",
                color: "#DC2626",
                fontWeight: "bold",
              }}
            >
              Pengeluaran: Rp {totalPengeluaran.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </Kartu>

      {/* Kartu Formulir Tambah Transaksi */}
      <Kartu judul="Tambah Transaksi Baru">
        <FormTransaksi onTambah={tambahTransaksi} />
      </Kartu>

      {/* Kartu Daftar Riwayat Transaksi */}
      <Kartu judul="Riwayat Transaksi">
        {transaksiList.length === 0 ? (
          <p className="kosong">
            Belum ada transaksi tercatat. Yuk tambahkan transaksi pertamamu!
          </p>
        ) : (
          <ul className="daftar">
            {transaksiList.map((t) => (
              <ItemTransaksi
                key={t.id}
                transaksi={t}
                onHapus={hapusTransaksi}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}

export default App;
