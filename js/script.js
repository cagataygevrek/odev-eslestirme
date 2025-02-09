// puan adında değişken oluşturuldu ve index.html dosyasındaki puanYazdir id seçilerek başlangıç puanı sıfır yapıldı.
let puan = document.getElementById("puanYazdir");
puan = 0;

const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`;

const fotograf = function () {
  let dizi = [];
  for (let i = 1; i < 8; i++) {
    let rastgeleBul = Math.floor(Math.random() * 99);
    dizi.push(rastgeleBul, rastgeleBul);
    if (dizi.length === 8) break;
  }

  return dizi;
};

const fotoNumaralari = fotograf();

// const fotoNumaralari = [10, 20, 30, 20, 10, 40, 40, 30];

for (fotoNumara of fotoNumaralari) {
  const yenikart = document.createElement("div");
  yenikart.innerHTML = kartTemplate;
  yenikart.classList.add("kart");
  yenikart.querySelector(
    ".kart-arkayuz img"
  ).src = `https://lipsum.app/id/${fotoNumara}/100x100`;
  document.querySelector("div#oyun-cerceve").append(yenikart);

  //Her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacak.
  yenikart.addEventListener("click", kartTiklama);
}

function kartTiklama(olay) {
  //Tıklanan kartı seçilen olarak değişkene atayalım
  const secilenKart = olay.currentTarget;

  //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
  if (secilenKart.classList.contains("eslesti") === true) {
    return;
  }

  //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
  if (secilenKart.classList.contains("acik") === true) {
    return;
  }

  //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
  const tumAcikKartlar = document.querySelectorAll(".acik");
  if (tumAcikKartlar.length === 2) {
    return;
  }

  //Açık olan kart varsa seçelim.
  const acikKart = document.querySelector(".acik");

  //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
  if (acikKart === null) {
    secilenKart.classList.add("acik");

    setTimeout(() => {
      secilenKart.classList.remove("acik");
    }, 1500);
    return;
  }

  //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
  secilenKart.classList.add("acik");

  //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
  const acikKartImg = acikKart.querySelector(".kart-arkayuz img");
  const secilenKartImg = secilenKart.querySelector(".kart-arkayuz img");

  if (acikKartImg.src === secilenKartImg.src) {
    //İki açık kart arasında eşleşme var.
    acikKart.classList.add("eslesti");
    secilenKart.classList.add("eslesti");

    // 0 olarak atanan puan başlangıcına kartlarda eşleşme varsa 1 puan eklenerek ekrana yazdırıldı.
    puan = puan + 1;
    document.getElementById("puanYazdir").innerHTML =
      puan + " puan kazandınız. ";

    acikKart.classList.remove("acik");
    secilenKart.classList.remove("acik");

    setTimeout(() => {
      acikKart.removeEventListener("click", kartTiklama);
      secilenKart.removeEventListener("click", kartTiklama);
    }, 1000);

    // tebrik görseli

    if (puan == 4) {
      let tebrikler = document.createElement("img");
      tebrikler.src = "https://i.hizliresim.com/5xms6ku.gif";
      resimOlustur = document.querySelector("body").appendChild(tebrikler);
      setTimeout(function () {
        resimOlustur.remove();
      }, 5000);
    }
  } else {
    //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
    setTimeout(() => {
      acikKart.classList.remove("acik");
      secilenKart.classList.remove("acik");
    }, 1500);
  }
}
