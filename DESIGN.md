# DESIGN.md — QR Dijital Menü Brandkit

> **Ürün:** Masadaki QR ile açılan kafe menüsü (müşteri) + menü yönetim paneli (kafe sahibi)  
> **Yön:** Sıcak nötr üçüncü dalga kahve — kemik beyazı zemin, terracotta vurgu, yüksek okunabilirlik  
> **Sürüm:** 1.0

---

## 1. Ton notu

Sade, davetkâr ve modern. Üçüncü dalga kahve dükkanı gibi: iştah açıcı ama gösterişsiz. Tipografi ve boşluk konuşur; gradyan, emoji ikon ve mor/indigo “AI varsayılanları” yok. Menü telefonda okunur — her metin satırı yüksek kontrastlı ve net hiyerarşili olmalı. Yönetim paneli aynı token’ları kullanır; daha yoğun, daha az “vitrin”, daha çok “araç”.

**Ses:** Kısa cümleler. Menü adları özgün; açıklamalar 1–2 satır. Fiyat her zaman sağda, tabular rakam.

---

## 2. Renk paleti (hex)

| Token | Hex | Kullanım |
|---|---|---|
| `--bg` | `#F5F0E8` | Sayfa zemini (kemik / krem) |
| `--surface` | `#FFFCF7` | Kart, sheet, panel yüzeyi |
| `--surface-2` | `#EFE8DC` | İkincil yüzey, chip arka planı |
| `--fg` | `#1A1410` | Ana metin (yüksek kontrast) |
| `--muted` | `#6A5B50` | İkincil metin, açıklama |
| `--border` | `#DDD3C5` | Ayırıcı, kart çerçevesi |
| `--accent` | `#C45C3E` | Birincil vurgu / CTA (terracotta) |
| `--accent-hover` | `#A84A30` | Vurgu hover / pressed |
| `--accent-soft` | `#F3E0D8` | Vurgu arka plan (chip, badge) |
| `--coffee` | `#3D2B1F` | Kategori / koyu bant, logo metni |
| `--success` | `#2F6B4F` | Stokta / aktif |
| `--warn` | `#B pen86 0E` | Sınırlı stok |
| `--danger` | `#A33B2B` | Tükendi / sil |
| `--focus` | `#C45C3E` | Focus ring (2px, offset 2px) |

### Kontrast kuralları (P0)

- Gövde metni (`--fg` on `--bg` / `--surface`): ≥ 4.5:1  
- Fiyat ve başlıklar: ≥ 4.5:1  
- `--muted` yalnızca yardımcı metinde; menü adı veya fiyat için kullanma  
- `--accent` dolgu üzerinde metin: `#FFFCF7`  
- Ekranda en fazla **2** belirgin accent kullanımı (ör. aktif kategori chip + birincil buton)

### CSS değişkenleri

```css
:root {
  --bg: #F5F0E8;
  --surface: #FFFCF7;
  --surface-2: #EFE8DC;
  --fg: #1A1410;
  --muted: #6A5B50;
  --border: #DDD3C5;
  --accent: #C45C3E;
  --accent-hover: #A84A30;
  --accent-soft: #F3E0D8;
  --coffee: #3D2B1F;
  --success: #2F6B4F;
  --warn: #B86B0E;
  --danger: #A33B2B;
  --focus: #C45C3E;
}
```

---

## 3. Tipografi

### Font ikilisi

| Rol | Aile | Fallback |
|---|---|---|
| **Display** (kafe adı, kategori, hero) | `Lora` | `'Iowan Old Style', Georgia, serif` |
| **Body / UI** (menü öğesi, açıklama, panel) | `Source Sans 3` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif` |
| **Mono** (fiyat, SKU, panel ID) | `IBM Plex Mono` | `ui-monospace, Menlo, monospace` |

```css
:root {
  --font-display: 'Lora', 'Iowan Old Style', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;
}
```

### Ölçek (1.25 oran, mobil menü odaklı)

| Rol | Boyut | Ağırlık | Line-height | Letter-spacing |
|---|---|---|---|---|
| Display | 32–40 px | 600 | 1.15 | -0.02em |
| H1 (ekran başlığı) | 28 px | 600 | 1.2 | -0.015em |
| H2 (kategori) | 20–22 px | 600 | 1.25 | -0.01em |
| H3 (kart başlığı / ürün adı) | 17–18 px | 600 | 1.3 | 0 |
| Body | 15–16 px | 400 | 1.55 | 0 |
| Small / meta | 13 px | 400–500 | 1.45 | 0.01em |
| Caption / etiket | 11–12 px | 500 | 1.4 | 0.06em (ALL CAPS) |
| Fiyat | 16–18 px | 600 | 1.2 | 0 · `tabular-nums` · mono veya body |

### Ağırlık disiplini (3 seviye)

1. **Read** — 400 (açıklama, gövde)  
2. **Emphasize** — 500–550 (nav, etiket, chip)  
3. **Announce** — 600 (başlık, ürün adı, fiyat, CTA)

700+ kullanma.

---

## 4. Boşluk ölçeği

4 px tabanlı:

| Token | Değer | Tipik kullanım |
|---|---|---|
| `--space-1` | 4 px | İkon–metin aralığı |
| `--space-2` | 8 px | Chip içi, sıkı grup |
| `--space-3` | 12 px | Kart içi dikey ritim |
| `--space-4` | 16 px | Kart padding (mobil) |
| `--space-5` | 24 px | Bölüm arası, liste gap |
| `--space-6` | 32 px | Ekran kenar boşluğu üst |
| `--space-7` | 48 px | Büyük bölüm ayrımı |

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
}
```

**Mobil menü:** yatay padding 16 px; kartlar arası 12 px; sticky kategori çubuğu altı 8 px nefes.

---

## 5. Köşe yuvarlaklığı

| Token | Değer | Kullanım |
|---|---|---|
| `--radius-sm` | 6 px | Chip, fiyat etiketi, input |
| `--radius-md` | 12 px | Ürün kartı, buton, sheet |
| `--radius-lg` | 16 px | Modal, büyük panel kartı |
| `--radius-pill` | 999 px | Kategori pill, badge |

Gölge minimal: yalnızca sheet/modal  
`0 8px 24px rgba(26, 20, 16, 0.08)` — kartlarda gölge yok; border yeterli.

---

## 6. Bileşen stili

### 6.1 Kategori başlığı

- Font: display, 20–22 px / 600  
- Renk: `--coffee`  
- Altında 1 px `--border` veya ince accent çizgi (2 px, max 32 px genişlik)  
- Üst boşluk `--space-5`, alt `--space-3`  
- Sticky kategori nav: yatay scroll pill’ler; aktif pill `--accent` dolgu + `--surface` metin

### 6.2 Ürün kartı (menü öğesi)

```
┌─────────────────────────────────────┐
│  Ürün adı                    ₺185   │
│  Kısa açıklama (1–2 satır)          │
│  [Vegan]  [Popüler]                 │
└─────────────────────────────────────┘
```

- Arka plan: `--surface`  
- Border: 1 px `--border`  
- Radius: `--radius-md` (12 px)  
- Padding: 16 px  
- Layout: grid — sol blok (ad + açıklama), sağda fiyat (üst hizalı)  
- Ürün adı: body font 17–18 px / 600 / `--fg`  
- Açıklama: 13–14 px / 400 / `--muted`, max 2 satır, `line-clamp`  
- Tükendi: opacity 0.55 + “Tükendi” badge (`--danger` soft)  
- Dokunma hedefi: min 44 px yükseklik; kart tıklanabilir alan

**Yasak:** sol renkli border + yuvarlak kart (AI dashboard kliği). Vurgu için badge veya fiyat rengi kullan.

### 6.3 Fiyat etiketi

- Font: body veya mono, 16–18 px / 600  
- `font-variant-numeric: tabular-nums`  
- Renk: `--fg` (varsayılan); kampanya için `--accent`  
- Hizalama: sağ, ürün adıyla aynı satır  
- Para birimi: `₺` önek, boşluksuz veya ince boşluk (`₺185`)

### 6.4 Birincil buton

| Durum | Stil |
|---|---|
| Default | bg `--accent`, text `#FFFCF7`, radius 12 px, padding 14×20, font 15–16 / 600, letter-spacing 0.02em |
| Hover / active | bg `--accent-hover` |
| Focus | 2 px ring `--focus`, offset 2 px |
| Disabled | opacity 0.4, pointer-events none |
| Min yükseklik | 48 px (mobil) |

İkincil buton: transparent / `--surface`, border `--border`, text `--fg`.  
Ghost: sadece metin, `--accent` veya `--fg` underline yok — renk yeterli.

### 6.5 Kategori pill (yatay nav)

- Padding: 8×14  
- Radius: pill  
- Default: `--surface-2` bg, `--fg` text, 13 px / 500  
- Active: `--accent` bg, `#FFFCF7` text  
- Gap: 8 px; overflow-x auto; scrollbar gizli

### 6.6 Badge / etiket

- Radius: `--radius-sm` veya pill  
- Padding: 4×8  
- Font: 11–12 px / 500, letter-spacing 0.04em  
- Örnekler: Popüler (`--accent-soft` + `--accent`), Vegan (`--surface-2` + `--coffee`), Tükendi (`#F5D6D0` + `--danger`)

### 6.7 Yönetim paneli (kafe sahibi)

Aynı token’lar; densite artar:

- Tablo satır yüksekliği ≥ 48 px  
- Form input: height 44–48 px, border `--border`, radius 6–12 px, focus ring accent  
- Sidebar / topbar: `--coffee` veya `--surface` + border  
- Durum pill: success / warn / danger soft arka planlar  
- Birincil aksiyon yine terracotta; silme `--danger` text/ghost

---

## 7. Platform notları

| Yüzey | Odak |
|---|---|
| **Müşteri menü (mobil web)** | 360–430 px öncelik; sticky header + kategori; tek sütun liste; yüksek kontrast |
| **Yönetim paneli (desktop web)** | 1280+; tablo + form; aynı renk/tipografi; daha az serif display |

İkonlar: 1.6–1.8 px stroke monoline SVG, `currentColor`. Emoji ikon yok.

---

## 8. Erişilebilirlik (özet)

- Metin / arka plan WCAG AA minimum  
- Focus her zaman görünür  
- Dokunma hedefi ≥ 44×44 px  
- `prefers-reduced-motion`: animasyonları kapat  
- Fiyat ve durum metinle de iletilir (sadece renge güvenme)

---

## 9. Anti-kalıp listesi

- Mor / indigo gradyan hero  
- Emoji feature ikonlar  
- Sol renkli border’lı yuvarlak kart  
- Inter / Roboto display olarak  
- Uydurma metrikler ve lorem ipsum  
- Her başlığın yanında ikon  
- Accent’in her yerde kullanımı

---

## 10. Hızlı implementasyon özeti

```css
/* Tek satırda sistem */
:root {
  --bg: #F5F0E8;
  --surface: #FFFCF7;
  --fg: #1A1410;
  --muted: #6A5B50;
  --border: #DDD3C5;
  --accent: #C45C3E;
  --coffee: #3D2B1F;
  --radius-md: 12px;
  --space-4: 16px;
  --font-display: 'Lora', Georgia, serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
}
```

**Marka cümlesi:** Kemik beyazı tuval, koyu mürekkep metin, tek terracotta vurgu; Lora başlık + Source Sans gövde — telefonda okunan sade üçüncü dalga menü.
