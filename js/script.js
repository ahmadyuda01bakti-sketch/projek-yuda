const NOMOR_WA = "6281234567890";
const rupiah = (n) => "Rp" + n.toLocaleString("en-US");
const $ = (id) => document.getElementById(id);

function renderProduk() {
  $("daftarProduk").innerHTML = produkList.map((p) => `
    <div class="col-12 col-md-6 col-xl-3">
      <article class="produk">
        <div class="produk-foto"><img src="${p.gambar}" alt="${p.nama}" loading="lazy"></div>
        <div class="produk-isi">
          <h3>${p.nama}</h3>
          <p>${p.deskripsi}</p>
          <ul class="varian">
            ${p.varian.map((v) => `
              <li class="${v.stok > 0 ? "" : "kosong"}">
                <span class="v-nama">${v.nama}</span>
                <span class="v-harga">${rupiah(v.harga)}</span>
                ${v.stok > 0
                  ? `<span class="stok ready">Stock ${v.stok}</span>`
                  : `<span class="stok habis">Sold out</span>`}
              </li>`).join("")}
          </ul>
          <button class="btn btn-laut" data-produk="${p.id}">
            <i class="bi bi-calculator"></i> Calculate order
          </button>
        </div>
      </article>
    </div>`).join("");

  document.querySelectorAll("[data-produk]").forEach((btn) => {
    btn.addEventListener("click", () => {
      $("selProduk").value = btn.dataset.produk;
      isiVarian();
      hitung();
      $("hitung").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function isiPilihan() {
  $("selProduk").innerHTML = produkList.map((p) => `<option value="${p.id}">${p.nama}</option>`).join("");
  $("selTujuan").innerHTML = tujuanList.map((t, i) => `<option value="${i}">${t.nama}</option>`).join("");
  isiVarian();
}

function isiVarian() {
  const p = produkList.find((x) => x.id === $("selProduk").value);
  $("selVarian").innerHTML = p.varian.map((v, i) =>
    `<option value="${i}" ${v.stok === 0 ? "disabled" : ""}>${v.nama} - ${rupiah(v.harga)}${v.stok === 0 ? " (Sold out)" : ""}</option>`).join("");
  $("selVarian").value = p.varian.findIndex((v) => v.stok > 0);
}

function hitung() {
  const p = produkList.find((x) => x.id === $("selProduk").value);
  const v = p.varian[Number($("selVarian").value)];
  const jumlah = parseInt($("inpJumlah").value, 10);
  const tujuan = tujuanList[Number($("selTujuan").value)];
  const metode = document.querySelector('input[name="metode"]:checked').value;
  const pesan = $("pesanStok");
  const hasil = $("hasil");

  if (!v || v.stok === 0) {
    pesan.textContent = "This variant is out of stock. Choose another variant.";
    return hasil.classList.add("d-none");
  }
  if (!Number.isInteger(jumlah) || jumlah < 1) {
    pesan.textContent = "Minimum quantity is 1.";
    return hasil.classList.add("d-none");
  }
  if (jumlah > v.stok) {
    pesan.textContent = `Not enough stock. Available stock is ${v.stok} units.`;
    return hasil.classList.add("d-none");
  }
  pesan.textContent = "";

  const subtotal = v.harga * jumlah;
  const berat = p.beratKg * jumlah;
  const rute = tujuan[metode];
  const ongkir = Math.ceil(berat) * rute.tarif;
  const total = subtotal + ongkir;

  const tiba = (hari) => {
    const d = new Date();
    d.setDate(d.getDate() + hari);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  $("outStatus").textContent = `In stock (${v.stok} units)`;
  $("outSubtotal").textContent = `${rupiah(v.harga)} x ${jumlah} = ${rupiah(subtotal)}`;
  $("outBerat").textContent = `${berat.toFixed(1)} kg (rounded up to ${Math.ceil(berat)} kg)`;
  $("outOngkir").textContent = `${rupiah(ongkir)} (${rupiah(rute.tarif)}/kg)`;
  $("outEstimasi").textContent = `${rute.hari[0]} - ${rute.hari[1]} days, arriving around ${tiba(rute.hari[0])} to ${tiba(rute.hari[1])}`;
  $("outTotal").textContent = rupiah(total);

  const teks = `Hello Mr. Ridwan, I would like to order:\n${p.nama} (${v.nama}) x ${jumlah}\nDestination: ${tujuan.nama} (${metode === "laut" ? "sea" : "air"} freight)\nTotal: ${rupiah(total)}`;
  $("btnWa").href = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`;
  hasil.classList.remove("d-none");
}

function renderFaq() {
  $("faqAccordion").innerHTML = faqList.map((f, i) => `
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button class="accordion-button ${i ? "collapsed" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#faq${i}">${f.q}</button>
      </h3>
      <div id="faq${i}" class="accordion-collapse collapse ${i ? "" : "show"}" data-bs-parent="#faqAccordion">
        <div class="accordion-body">${f.a}</div>
      </div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProduk();
  isiPilihan();
  renderFaq();
  $("selProduk").addEventListener("change", () => { isiVarian(); hitung(); });
  ["selVarian", "selTujuan", "inpJumlah"].forEach((id) => $(id).addEventListener("input", hitung));
  document.querySelectorAll('input[name="metode"]').forEach((r) => r.addEventListener("change", hitung));
  $("tahun").textContent = new Date().getFullYear();
  hitung();
});
