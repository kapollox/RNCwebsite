import { Part } from '@/types';

export const parts: Part[] = [
  {
    id: '1',
    name: 'Honda CB500F / CB500X Ön Fren Balatası',
    slug: 'honda-cb500f-x-on-fren-balatasi',
    partNumber: 'HN-BRK-CB500-F01',
    categoryId: 'fren-sistemi',
    categoryName: 'Fren Sistemi',
    description:
      'Honda CB500F ve CB500X 2013–2023 modelleri için ön fren balatası. Yüksek sıcaklık dayanımlı yarı metalik bileşim, Nissin 2 pistonlu kaliper uyumlu.',
    specs: {
      Malzeme: 'Yarı metalik bileşim',
      'Kaliper Uyumu': 'Nissin 2 pistonlu',
      'Min. Kalınlık': '1.5 mm',
      Konum: 'Ön aks',
      'Paket İçeriği': '2 adet balata + pim seti',
    },
    availability: 'available',
    compatibleModels: [
      'Honda CB500F 2013–2023',
      'Honda CB500X 2013–2023',
      'Honda CB500R 2019–2023',
    ],
    imageAlt:
      'Honda CB500F ön fren balatası — beyaz arka plan üzerinde teknik ürün görseli',
  },
  {
    id: '2',
    name: 'Honda CRF250R Piston Seti (Standart Çap)',
    slug: 'honda-crf250r-piston-seti-standart',
    partNumber: 'HN-ENG-CRF250-P01',
    categoryId: 'motor-egzoz',
    categoryName: 'Motor & Egzoz',
    description:
      'Honda CRF250R 2018–2023 için standart çap komple piston seti. Dövme alüminyum piston, segman takımı, pim ve klips dahil.',
    specs: {
      Çap: '76.80 mm (standart)',
      'Sıkıştırma Oranı': '13.9:1',
      'Pim Çapı': '18 mm',
      Malzeme: 'Dövme alüminyum',
      'Paket İçeriği': 'Piston + segman + pim + klips',
    },
    availability: 'available',
    compatibleModels: ['Honda CRF250R 2018–2023'],
    imageAlt: 'Honda CRF250R standart çap piston seti teknik ürün görseli',
  },
  {
    id: '3',
    name: 'Honda CBR600RR Zincir-Dişli Takımı',
    slug: 'honda-cbr600rr-zincir-disli-takimi',
    partNumber: 'HN-DRV-CBR600-CH01',
    categoryId: 'aktarma-organlari',
    categoryName: 'Aktarma Organları',
    description:
      'Honda CBR600RR 2007–2023 için 520 pitch X-ring sızdırmaz zincir ve ön/arka dişli takımı. Komple aktarma seti.',
    specs: {
      'Zincir Pitch': '520',
      'Zincir Uzunluğu': '114 halka',
      'Zincir Tipi': 'X-Ring sızdırmaz',
      'Ön Dişli': '16T',
      'Arka Dişli': '43T',
    },
    availability: 'available',
    compatibleModels: ['Honda CBR600RR 2007–2023'],
    imageAlt: 'Honda CBR600RR 520 pitch zincir ve dişli takımı ürün görseli',
  },
  {
    id: '4',
    name: 'Honda PCX 125 LED Far Camı',
    slug: 'honda-pcx-125-led-far-cami',
    partNumber: 'HN-BDY-PCX125-HL01',
    categoryId: 'kaporta-plastik',
    categoryName: 'Kaporta & Plastik',
    description:
      'Honda PCX 125 2021–2023 için LED far üst camı. UV ışınlarına dayanıklı polikarbonat, orijinal kızak sistemi ile tam uyumlu montaj.',
    specs: {
      Malzeme: 'Polikarbonat (PC)',
      'UV Dayanımı': 'Evet',
      Renk: 'Şeffaf',
      Montaj: 'Orijinal kızak sistemi',
    },
    availability: 'limited',
    compatibleModels: ['Honda PCX 125 2021–2023'],
    imageAlt: 'Honda PCX 125 LED far camı polikarbonat ürün görseli',
  },
  {
    id: '5',
    name: 'Honda CB650R / CBR650R Arka Amortisör',
    slug: 'honda-cb650r-cbr650r-arka-amortisoru',
    partNumber: 'HN-SUS-CB650R-RS01',
    categoryId: 'suspansiyon',
    categoryName: 'Süspansiyon',
    description:
      'Honda CB650R ve CBR650R 2019–2023 için ayarlanabilir mono amortisör. Preload 7 kademe, rebound ayarlı alüminyum gövde.',
    specs: {
      Tip: 'Mono amortisör',
      'Toplam Uzunluk': '340 mm',
      Preload: '7 kademe ayarlı',
      Rebound: 'Ayarlı',
      Gövde: 'Alüminyum',
    },
    availability: 'inquiry',
    compatibleModels: [
      'Honda CB650R 2019–2023',
      'Honda CBR650R 2019–2023',
    ],
    imageAlt: 'Honda CB650R CBR650R ayarlanabilir arka amortisör ürün görseli',
  },
  {
    id: '6',
    name: 'Honda Forza 350 AGM Akü',
    slug: 'honda-forza-350-agm-aku',
    partNumber: 'HN-ELC-FZ350-BAT01',
    categoryId: 'elektrik-aydinlatma',
    categoryName: 'Elektrik & Aydınlatma',
    description:
      'Honda Forza 350 2020–2023 için AGM kapalı bakımsız akü. Yüksek CCA değeri, vibrasyona ve darbaya dayanıklı yapı.',
    specs: {
      Kapasite: '12V / 8Ah',
      CCA: '120A',
      Tip: 'AGM kapalı bakımsız',
      'Kutup Konumu': 'Pozitif sol',
      Boyutlar: '150 × 65 × 93 mm',
    },
    availability: 'available',
    compatibleModels: [
      'Honda Forza 350 2020–2023',
      'Honda Forza 300 2018–2020',
    ],
    imageAlt: 'Honda Forza 350 AGM akü 12V 8Ah teknik ürün görseli',
  },
];

export function getPartBySlug(slug: string): Part | undefined {
  return parts.find((p) => p.slug === slug);
}

export function getPartsByCategory(categoryId: string): Part[] {
  return parts.filter((p) => p.categoryId === categoryId);
}
