// src/ItemTransaksi.jsx
function ItemTransaksi({ transaksi, onHapus }) {
  const isPemasukan = transaksi.jenis === "Pemasukan";

  return (
    <li
      className="item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <span
          style={{ fontWeight: "bold", display: "block", color: "#1F2937" }}
        >
          {transaksi.keterangan}
        </span>
        <small style={{ color: "#687280" }}>{transaksi.jenis}</small>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontWeight: "bold",
            color: isPemasukan ? "#10B981" : "#DC2626",
          }}
        >
          {isPemasukan ? "+" : "-"} Rp{" "}
          {transaksi.nominal.toLocaleString("id-ID")}
        </span>
        <button
          className="tombol tombol-merah tombol-kecil"
          onClick={() => onHapus(transaksi.id)}
        >
          Hapus
        </button>
      </div>
    </li>
  );
}

export default ItemTransaksi;
