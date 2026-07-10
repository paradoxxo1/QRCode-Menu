# PRD: QR Dijital Menü Uygulaması

## Problem

Kafe işletmecisi, basılı menülerin maliyetli ve yavaş güncellenebilir olmasından rahatsız. Fiyat veya ürün değiştiğinde menüyü yeniden bastırmak hem masraflı hem de zaman kaybettirici. Ayrıca müşterilere daha modern, dijital bir deneyim sunarak rakiplerinden ayrışmak istiyor. İşletme tek bir kafe değil, aynı markaya bağlı birden fazla şubeden oluşuyor; her şubenin kendine özgü fiyatlandırma ve stok durumu olabiliyor, ama merkezi bir ürün kataloğu üzerinden yönetilmek isteniyor.

## Çözüm

Müşterilerin masadaki/şubedeki QR kodu okutarak anında güncel, çok dilli ve görsel açıdan zengin bir dijital menüye ulaşabildiği bir web uygulaması geliştirilecek. Kafe sahibi ve şube yöneticileri, web tabanlı bir yönetim paneli üzerinden ürünleri, kategorileri, fotoğrafları, şube bazlı fiyatları ve stok durumunu (tükendi işaretleme) anında güncelleyebilecek. Sistem çoklu şube yapısını destekleyecek: ürün kataloğu merkezi yönetilirken her şube kendi fiyat ve stok bilgisini ayarlayabilecek, yeni şubeler panelden eklenip kendi QR kodları otomatik üretilebilecek. İlk sürüm (MVP) yalnızca menü görüntülemeye odaklanacak; sipariş verme ve ödeme bu kapsamın dışında tutulacak.

## Kullanıcı Hikayeleri

### Müşteri (menü görüntüleyen)

1. Bir kafe müşterisi olarak, masadaki/şubedeki QR kodu okutmak istiyorum, böylece uygulama indirmeden anında dijital menüye ulaşabilirim.
2. Bir kafe müşterisi olarak, menüyü kategorilere ayrılmış şekilde görmek istiyorum, böylece aradığım ürün türünü (kahve, tatlı, içecek vb.) hızlıca bulabilirim.
3. Bir kafe müşterisi olarak, ürünlerin fotoğraflarını görmek istiyorum, böylece siparişimi görsel olarak değerlendirerek verebilirim.
4. Bir kafe müşterisi olarak, ürün fiyatlarını güncel ve doğru şekilde görmek istiyorum, böylece yanlış fiyat beklentisiyle sipariş vermem.
5. Bir kafe müşterisi olarak, tükenmiş ürünleri menüde açıkça görmek istiyorum, böylece olmayan bir ürünü sipariş etmeye çalışıp hayal kırıklığına uğramam.
6. Bir yabancı/turist müşteri olarak, menüyü kendi dilimde (İngilizce) görüntülemek istiyorum, böylece ürünleri ve içeriklerini anlayabilirim.
7. Bir kafe müşterisi olarak, menüyü mobil tarayıcımda hızlı ve kolay şekilde gezmek istiyorum, böylece uygulama indirmeden rahat bir deneyim yaşarım.
8. Bir kafe müşterisi olarak, hangi şubede olduğumu (QR'ı okuttuğum şubeye özel) fark etmeden doğru menüyü görmek istiyorum, böylece başka bir şubenin fiyat/stok bilgisiyle karışıklık yaşamam.
9. Bir kafe müşterisi olarak, seçtiğim dilin ziyaretim boyunca hatırlanmasını istiyorum, böylece her sayfada dili yeniden seçmek zorunda kalmam.
10. Bir kafe müşterisi olarak, seçtiğim dilde çevirisi olmayan bir üründe boş içerik yerine varsayılan dildeki (Türkçe) metni görmek istiyorum, böylece hiçbir ürün eksik/boş görünmez.
11. Bir kafe müşterisi olarak, kategorilerin ve ürünlerin işletmenin belirlediği mantıklı bir sırayla (örn. öne çıkanlar üstte) listelenmesini istiyorum, böylece menü rastgele değil düzenli görünür.
12. Bir kafe müşterisi olarak, geçersiz veya kaldırılmış bir şube QR'ını okutursam anlaşılır bir hata/yönlendirme sayfası görmek istiyorum, böylece bozuk bir sayfayla karşılaşmam.

### Şube Yöneticisi (personel)

13. Bir şube yöneticisi olarak, giriş yaptığımda sadece kendi şubemin menü ve stok bilgilerini yönetebilmek istiyorum, böylece diğer şubelerin verilerini yanlışlıkla değiştirmem.
14. Bir şube yöneticisi olarak, bir ürünü anında "tükendi" olarak işaretlemek ve tekrar "mevcut" yapmak istiyorum, böylece stok durumu değiştikçe menüyü güncel tutarım.
15. Bir şube yöneticisi olarak, kendi şubem için ürün fiyatlarını güncelleyebilmek istiyorum, böylece bölgesel fiyat farklarını (kira, maliyet vb.) yansıtabilirim.
16. Bir şube yöneticisi olarak, panele mobil veya masaüstü tarayıcıdan giriş yapabilmek istiyorum, böylece işletmede anlık güncelleme yapabilirim.
17. Bir şube yöneticisi olarak, kendi şubem için henüz özel fiyat girmediğim ürünlerde merkezi (varsayılan) fiyatın geçerli olduğunu görebilmek istiyorum, böylece hangi ürünlerin şubeye özel fiyatlandırıldığını ayırt edebilirim.

### Genel Admin (kafe sahibi/merkez)

18. Bir kafe sahibi olarak, merkezi bir ürün kataloğu (kategori, ürün adı, açıklama, fotoğraf, varsayılan fiyat) oluşturmak istiyorum, böylece tüm şubeler ortak bir temelden başlayarak menülerini yönetebilir.
19. Bir kafe sahibi olarak, kategori ve ürünlerin gösterim sırasını belirleyebilmek istiyorum, böylece menüde öne çıkarmak istediğim ürünleri üste alabilirim.
20. Bir kafe sahibi olarak, yeni bir şube eklediğimde sistemin o şube için otomatik bir QR kod üretmesini istiyorum, böylece manuel QR oluşturma işiyle uğraşmam.
21. Bir kafe sahibi olarak, artık faaliyette olmayan bir şubeyi sistemden kaldırabilmek istiyorum, böylece menü ve QR kodları güncel kalır.
22. Bir kafe sahibi olarak, şube yöneticisi hesapları oluşturup her birini kendi şubesiyle ilişkilendirmek, gerektiğinde bu hesapları devre dışı bırakmak istiyorum, böylece yetkilendirme doğru şekilde sınırlandırılır.
23. Bir kafe sahibi olarak, tüm şubelerin menülerine ve fiyatlarına merkezi olarak erişip gerekirse düzenleme yapabilmek istiyorum, böylece genel kontrolü elimde tutabilirim.
24. Bir kafe sahibi olarak, bir ürünü yeni bir dilde (örn. İngilizce) çevirisiyle birlikte eklemek istiyorum, böylece çoklu dil desteği eksiksiz olur.
25. Bir kafe sahibi olarak, ürün fotoğrafı yükleyebilmek istiyorum, böylece menü görsel olarak çekici olur.
26. Bir kafe sahibi olarak, oluşturulan QR kodunu indirip (PNG/SVG) yazdırabilmek istiyorum, böylece masalara veya şube girişine fiziksel olarak yerleştirebilirim.
27. Bir kafe sahibi olarak, bir ürünü tüm menüden geçici olarak yayından kaldırabilmek (pasife almak) istiyorum, böylece silmeden mevsimsel/geçici ürünleri yönetebilirim.

## Uygulama Kararları

- **Genel mimari**: Next.js 16 (App Router, TypeScript) tabanlı tam yığın (full-stack) web uygulaması. Public menü sayfaları SSR/ISR ile sunulacak; yönetim paneli aynı uygulama içinde korumalı (authenticated) rotalar olarak yer alacak.
- **Veritabanı & ORM**: PostgreSQL, veri erişim katmanı olarak Prisma. İlişkisel model (şube ↔ ürün ↔ override) tip-güvenli şema ve migration'larla yönetilir.
- **Kimlik doğrulama**: Auth.js (NextAuth) credentials sağlayıcısı ile e-posta/şifre girişi. Şifreler hash'lenerek saklanır (örn. bcrypt/argon2). Kullanıcının rolü ve (varsa) bağlı olduğu şube, oturuma (session/JWT) gömülür; yetki kontrolleri hem UI hem de sunucu (API/route handler) tarafında yapılır — güvenlik yalnızca UI gizlemeye bırakılmaz.
- **Görsel depolama**: Ürün fotoğrafları VPS yerel diskine yüklenir ve `next/image` ile optimize edilir. Yükleme sırasında dosya tipi (jpg/png/webp) ve boyut sınırı doğrulanır.
- **Public menü URL yapısı**: Şubeye özel menü, insan-okunur slug ile sunulur: `/menu/[sube-slug]` (örn. `/menu/kadikoy`). Slug, şube adından otomatik üretilir ve benzersizdir; QR kod bu URL'i kodlar.
- **Çoklu şube modeli**: Tek işletmeye ait, merkezi yönetilen bir ürün/kategori kataloğu bulunur. Şube varlığı (branch) ayrı bir kayıt olarak tutulur; her şube, kataloğtaki her ürün için kendine özel fiyat ve stok-durumu (mevcut/tükendi) override'ı tanımlayabilir. Override tanımlanmazsa varsayılan (merkezi) fiyat/durum geçerli olur.
- **Sıralama**: Kategoriler ve ürünler, admin'in belirlediği `displayOrder` alanına göre sıralanır; public menü bu sıralamaya uyar.
- **i18n davranışı**: Varsayılan dil Türkçe'dir. Seçilen dilde çeviri yoksa varsayılan dile (TR) fallback yapılır. Kullanıcının dil tercihi tarayıcıda (cookie/localStorage) saklanarak ziyaret boyunca korunur.
- **Para birimi ve fiyat formatı**: Fiyatlar TRY (₺) cinsinden, kuruş hassasiyetini kaybetmeyecek şekilde (tam sayı-kuruş veya decimal) saklanır ve yerel formatta gösterilir.
- **Silme davranışı**: Şube ve ürün silme işlemleri soft-delete (pasife alma) mantığıyla yapılır; ilişkili override ve QR kayıtlarının bütünlüğü korunur, geçmiş veriyle tutarsızlık oluşmaz. Kaldırılmış/pasif bir şubenin QR'ı okutulduğunda anlaşılır bir "menü bulunamadı" sayfası gösterilir.
- **Modüller**:
  1. **Menü Görüntüleme (Public)**: Şubeye özel QR'dan gelen istekte ilgili şubenin kategorilere ayrılmış ürün listesini, fotoğraf, çoklu dil içeriği ve güncel fiyat/stok bilgisiyle gösteren salt-okunur arayüz.
  2. **Menü İçerik Yönetimi (Admin)**: Kategori ve ürün CRUD işlemleri (ad, açıklama, fotoğraf, çoklu dil çevirileri), şube bazlı fiyat/stok override yönetimi.
  3. **Şube Yönetimi (Admin)**: Şube CRUD (ad, adres, iletişim vb.), şube oluşturulduğunda otomatik QR kod üretimi.
  4. **Kimlik Doğrulama & Roller**: İki rol — `super_admin` (tüm şubelere ve kataloğa tam erişim) ve `branch_manager` (yalnızca kendi şubesinin fiyat/stok bilgisine erişim). Oturum tabanlı kimlik doğrulama.
  5. **QR Kod Üretimi**: Şube oluşturma/güncelleme akışına bağlı, şubenin menü URL'sini kodlayan QR görseli üretimi ve indirilebilir (PNG/SVG) çıktı.
  6. **Çoklu Dil (i18n)**: Ürün/kategori adı ve açıklamasının en az Türkçe ve İngilizce olarak saklanması; public menüde dil seçici.
- **Veri modeli (kavramsal)**:
  - `Branch` — şube: ad, benzersiz slug, adres/iletişim, durum (aktif/pasif).
  - `Category` — kategori: çok dilli ad, `displayOrder`.
  - `Product` — ürün: çok dilli ad/açıklama, fotoğraf, varsayılan fiyat, isteğe bağlı kalori bilgisi (kcal), kategori ilişkisi, `displayOrder`, yayın durumu (aktif/pasif).
  - `ProductBranchOverride` — ürün + şube bazlı: özel fiyat (opsiyonel), stok durumu (mevcut/tükendi). Kayıt yoksa varsayılan geçerlidir.
  - `User` — yönetim kullanıcısı: e-posta, hash'lenmiş şifre, rol (`super_admin` / `branch_manager`), bağlı şube (branch_manager için zorunlu), aktiflik durumu.
- **Kapsam sınırı (MVP)**: Sipariş verme, ödeme entegrasyonu ve masa bazlı QR bu sürümde yok; şubeye özel tek QR kullanılacak.
- **Barındırma**: Hostinger VPS üzerinde, kendi alan adında HTTPS (Let's Encrypt) ile yayına alınacak (`deploy-app` skill kullanılabilir). PostgreSQL aynı VPS'te veya yönetilen bir servis olarak çalışabilir.

### Fonksiyonel Olmayan Gereksinimler

- **Mobil öncelikli & responsive**: Public menü öncelikli olarak mobil tarayıcı için tasarlanır; masaüstünde de bozulmadan çalışır.
- **Performans**: Menü sayfası, küçük ölçekte (2-3 şube, ~30-50 ürün) gözle görülür gecikme olmadan yüklenir; ürün görselleri optimize edilir (lazy-load, uygun boyutlandırma).
- **Erişilebilirlik**: Temel erişilebilirlik (yeterli kontrast, alt metinleri, klavye ile gezilebilir yönetim paneli) gözetilir.
- **Güvenlik**: Yetkilendirme sunucu tarafında zorunlu kılınır; şifreler hash'lenir; oturum çerezleri güvenli (httpOnly, secure) işaretlenir. Bir `branch_manager` başka şubenin verisine erişemez.
- **Güvenilirlik**: Veritabanı migration'ları versiyonlanır; görsel yüklemeleri ve veritabanı için düzenli yedek alınması önerilir.

## Test Kararları

- İyi bir test, iç implementasyon detaylarını değil dışa dönük davranışı doğrular: bir fonksiyona/endpoint'e girdi verilir, beklenen çıktı veya yan etki (veritabanı durumu, dönen yanıt) kontrol edilir; iç yapıya (örn. hangi yardımcı fonksiyonun çağrıldığına) bağımlı olunmaz.
- Test yazılacak modül: **Menü İçerik Yönetimi**. Kapsanması gereken senaryolar:
  - Yeni kategori/ürün oluşturma, geçerli alanlarla başarılı kayıt.
  - Ürün güncelleme: ad, açıklama, fotoğraf, çoklu dil çevirisi değişikliklerinin doğru şekilde kaydedilmesi.
  - Şube bazlı fiyat/stok override oluşturma ve bu override'ın override tanımlanmamış diğer şubeleri etkilememesi.
  - Bir ürünün "tükendi" olarak işaretlenmesinin ilgili şubenin public menü çıktısına yansıması.
  - Override tanımlanmamış bir şubede varsayılan (merkezi) fiyatın; tanımlı şubede ise override fiyatın döndüğünün doğrulanması.
  - Seçilen dilde çeviri olmayan üründe varsayılan dile (TR) fallback davranışı.
  - Geçersiz girdilerle (boş ad, negatif fiyat vb.) yapılan işlemlerin reddedilmesi.
- Yetkilendirme, güvenlik açısından kritik olduğundan bu senaryo da test edilir: `branch_manager` rolünün yalnızca kendi şubesinin verisini güncelleyebildiği, başka şubeye yönelik isteğin sunucu tarafında reddedildiği (403) doğrulanır.
- Proje şu an boş/yeni olduğundan mevcut test altyapısından örnek yok; test çatısı (örn. Vitest/Jest) implementasyon aşamasında kurulacak.

## Kabul Kriterleri

1. Bir şubeye ait QR kod okutulduğunda, o şubenin kategorilere ayrılmış ürün listesi, fotoğrafları ve güncel fiyat/stok bilgisiyle tarayıcıda hatasız açılır.
2. `super_admin` rolündeki kullanıcı, panelden yeni bir kategori ve ürün oluşturabilir, bu ürün ilgili şubelerin public menüsünde görünür.
3. `branch_manager` rolündeki kullanıcı, yalnızca kendi şubesinin fiyat/stok bilgisini güncelleyebilir; başka bir şubenin verisini değiştirmeye çalıştığında istek reddedilir (403).
4. Bir ürün bir şubede "tükendi" olarak işaretlendiğinde, o şubenin public menüsünde ürün tükendi etiketiyle görünür; diğer şubelerin menüsü etkilenmez.
5. Yeni bir şube panelden eklendiğinde, o şubeye özel bir QR kod otomatik üretilir ve indirilebilir.
6. Public menü sayfası en az Türkçe ve İngilizce dil seçenekleriyle görüntülenebilir; dil değiştirildiğinde ürün adı/açıklaması ilgili dilde gösterilir.
7. Menü İçerik Yönetimi modülü için yazılan testler (Test Kararları bölümünde listelenen senaryolar) eksiksiz geçer.
8. Uygulama, production build (`next build`) hatasız tamamlanır ve Hostinger VPS üzerinde kendi alan adında HTTPS ile erişilebilir durumdadır.
9. Şube sayısı veya ürün sayısı arttığında (küçük ölçek: 2-3 şube, şube başına ~30-50 ürün) menü sayfası kabul edilebilir sürede (gözle görülür gecikme olmadan) yüklenir.
10. Kaldırılmış/pasif bir şubenin QR'ı okutulduğunda, bozuk sayfa yerine anlaşılır bir "menü bulunamadı" sayfası gösterilir.
11. Override fiyatı olmayan ürün, ilgili şubenin menüsünde varsayılan (merkezi) fiyatıyla; override fiyatı olan ürün ise şubeye özel fiyatıyla gösterilir.
12. Public menü ve yönetim paneli mobil tarayıcıda düzgün (responsive) görüntülenir ve kullanılabilir.

## Başarı Metrikleri

- Fiyat/ürün güncellemesi, basılı menü döngüsü (gün/hafta) yerine dakikalar içinde canlıya yansır — güncelleme için baskı maliyeti sıfırlanır.
- Her aktif şube için çalışan, taranabilir bir QR kod mevcuttur ve müşteri menüye uygulama indirmeden, tek taramayla ulaşır.
- Şube yöneticileri, teknik destek gerekmeden kendi fiyat/stok güncellemelerini panelden bağımsızca yapabilir.

## Kapsam Dışı

- Uygulama içinden sipariş verme ve mutfak/garson bildirim sistemi.
- Ödeme entegrasyonu.
- Masa bazlı QR kod ve masa/sipariş takibi.
- Kampanya/indirim yönetimi ve gösterimi.
- Alerjen/besin değeri bilgisi gösterimi (kalori bilgisi kapsama dahil edildi — bkz. Veri modeli).
- Çoklu işletme (multi-tenant SaaS) desteği — sistem tek işletmenin (çoklu şubeli) kullanımı için tasarlanır, başka işletmelerin aynı sistemi kiralaması kapsam dışıdır.
- Müşteri hesabı/girişi, favori ürün, sipariş geçmişi gibi müşteri tarafı kişiselleştirme özellikleri.
- Native mobil uygulama; yalnızca mobil tarayıcı üzerinden erişilebilen web deneyimi hedeflenir.
- Bulut/harici obje depolama (S3, Cloudinary vb.) ile görsel barındırma; görseller yalnızca VPS yerel diskinde tutulur.

## Notlar

- Proje dizini PRD yazımı sırasında boş durumdaydı (önceki Next.js iskeleti dosyaları çalışma dizininden silinmiş, ilk commit'te mevcut); bu nedenle kod tabanı keşfi adımı atlandı ve mimari kararlar sıfırdan alındı.
- Kullanıcı, "Menü Görüntüleme (Public)" ve "Şube Yönetimi" gibi diğer modüller için otomatik test istemedi; bu modüller manuel/uçtan uca doğrulamayla (örn. `/verify` skill'i) kontrol edilebilir.
- Barındırma için Hostinger VPS tercih edildi; uygulama geliştirmesi tamamlandığında `deploy-app` skill'i ile canlıya alma süreci yürütülebilir.
- İnceleme sonrası netleştirilen teknik kararlar: veritabanı **PostgreSQL + Prisma**, kimlik doğrulama **Auth.js (NextAuth) credentials**, görsel depolama **VPS yerel disk + `next/image`**, public menü URL yapısı **`/menu/[sube-slug]`**. Bu kararlar kullanıcı onayıyla belirlendi.
- **Görseller yerel diskte tutulur; bulut/harici obje depolama (S3, Cloudinary vb.) kapsam dışıdır ve tercih edilmez.** Yüklenen dosyalar VPS üzerinde kalıcı bir dizinde saklanır ve düzenli yedeklemeye dahil edilir.
- Ölçek büyüdüğünde (orta/büyük şube sayısı) ISR/cache stratejisi yeniden değerlendirilebilir; MVP için basit tutulmuştur (yerel disk + `next/image` optimizasyonu).
