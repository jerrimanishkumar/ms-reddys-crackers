import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Printer,
  X,
  Calculator,
  Store,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';

// MASTER DATASET (100% EXACT EXTRACT FROM ALL 8 INVOICE PAGES - MS REDDY CRACKERS)
const INVOICE_ITEMS = [
  // PAGE 1
  {
    page: 1,
    code: 69,
    name: '4 NIAGARA RSR (25box/case)',
    qty: '2 pcs',
    rate: 380.0,
    sellPrice: 550,
    cat: 'Fountains',
  },
  {
    page: 1,
    code: 70,
    name: '4 IN DOUBLE BALL (24box/case)',
    qty: '1 pcs',
    rate: 450.0,
    sellPrice: 700,
    cat: 'Rockets & Fancy',
  },
  {
    page: 1,
    code: 71,
    name: '4 X 4 WHEEL (100box/case)',
    qty: '10 pcs',
    rate: 145.0,
    sellPrice: 250,
    cat: 'Chakkars / Wheels',
  },
  {
    page: 1,
    code: 72,
    name: 'Small Peacock (60box/case)',
    qty: '10 pcs',
    rate: 130.0,
    sellPrice: 250,
    cat: 'Fountains',
  },
  {
    page: 1,
    code: 73,
    name: 'Bada Peacock (20box/case)',
    qty: '15 pcs',
    rate: 300.0,
    sellPrice: 450,
    cat: 'Fountains',
  },
  {
    page: 1,
    code: 74,
    name: '2000 Wala Sandel (24box/case)',
    qty: '10 pcs',
    rate: 220.0,
    sellPrice: 400,
    cat: 'Sound Crackers',
  },
  {
    page: 1,
    code: 75,
    name: '56 GAINT (360box/case)',
    qty: '100 pcs',
    rate: 50.0,
    sellPrice: 100,
    cat: 'Sound Crackers',
  },
  {
    page: 1,
    code: 76,
    name: '240 SHOTS RL (4box/case)',
    qty: '1 pcs',
    rate: 3040.0,
    sellPrice: 5000,
    cat: 'Rockets & Fancy',
  },
  {
    page: 1,
    code: 77,
    name: '3 IN COLOUR CRACKLING MIX FOUNTAIN (84box/case)',
    qty: '15 pcs',
    rate: 145.0,
    sellPrice: 250,
    cat: 'Fountains',
  },

  // PAGE 2
  {
    page: 2,
    code: 33,
    name: 'Ganga Jamuna (220box/case)',
    qty: '40 pcs',
    rate: 68.0,
    sellPrice: 120,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 2,
    code: 34,
    name: 'I Cone 50 Pcs (50box/case)',
    qty: '5 pcs',
    rate: 200.0,
    sellPrice: 350,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 35,
    name: 'BIG SIRAN (60box/case)',
    qty: '25 pcs',
    rate: 185.0,
    sellPrice: 330,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 36,
    name: 'SKY SHOT 10 PCS (200box/case)',
    qty: '15 pcs',
    rate: 95.0,
    sellPrice: 200,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 37,
    name: '7 SHOTS 5 Pcs (90box/case)',
    qty: '10 pcs',
    rate: 145.0,
    sellPrice: 250,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 38,
    name: 'TOP SPIN BAMBARA (300box/case)',
    qty: '15 pcs',
    rate: 75.0,
    sellPrice: 150,
    cat: 'Chakkars / Wheels',
  },
  {
    page: 2,
    code: 39,
    name: 'MUSIC BUTTERFLY MIX DAMO (50box/case)',
    qty: '5 BOX',
    rate: 270.0,
    sellPrice: 450,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 40,
    name: 'CHUKKI MIX (102box/case)',
    qty: '5 BOX',
    rate: 150.0,
    sellPrice: 280,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 41,
    name: 'FIRE SPLENDER (63box/case)',
    qty: '5 pcs',
    rate: 160.0,
    sellPrice: 300,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 42,
    name: 'GALAXY Fountain (96box/case)',
    qty: '3 pcs',
    rate: 130.0,
    sellPrice: 250,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 43,
    name: 'Sivakasi Pencil 2 Pcs (95box/case)',
    qty: '15 pcs',
    rate: 180.0,
    sellPrice: 300,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 2,
    code: 44,
    name: 'Popcorn / Waterqueen Pencil 5 Pcs (100box/case)',
    qty: '15 pcs',
    rate: 145.0,
    sellPrice: 250,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 2,
    code: 45,
    name: 'CHOTA BHEEM CANDLES (56box/case)',
    qty: '10 BOX',
    rate: 165.0,
    sellPrice: 250,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 2,
    code: 46,
    name: 'CHOCOLATE CHAKKAR DAMO 11 IN 1 (160box/case)',
    qty: '2 BOX',
    rate: 110.0,
    sellPrice: 200,
    cat: 'Chakkars / Wheels',
  },
  {
    page: 2,
    code: 47,
    name: 'Chocolate Tins (50box/case)',
    qty: '2 pcs',
    rate: 245.0,
    sellPrice: 400,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 48,
    name: 'PEACOCK FEATHER (120box/case)',
    qty: '5 pcs',
    rate: 90.0,
    sellPrice: 200,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 49,
    name: 'MINIONS / EMOJI / RIO / SHERK RSR (100box/case)',
    qty: '10 pcs',
    rate: 135.0,
    sellPrice: 220,
    cat: 'Fountains',
  },
  {
    page: 2,
    code: 50,
    name: 'OLD IS GOLD 100PCS (100box/case)',
    qty: '5 pcs',
    rate: 125.0,
    sellPrice: 250,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 51,
    name: 'ROCKET BOMB BHEEMA (160box/case)',
    qty: '100 BOX',
    rate: 50.0,
    sellPrice: 100,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 52,
    name: 'WHISLING ROCKET (80box/case)',
    qty: '6 BOX',
    rate: 150.0,
    sellPrice: 250,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 53,
    name: '1 KG PAPER BOMB (30box/case)',
    qty: '7 BOX',
    rate: 144.0,
    sellPrice: 300,
    cat: 'Bombs & Heavy',
  },
  {
    page: 2,
    code: 54,
    name: '500 GMS PAPER BOMB 70 PCS (70box/case)',
    qty: '7 BOX',
    rate: 72.0,
    sellPrice: 150,
    cat: 'Bombs & Heavy',
  },
  {
    page: 2,
    code: 55,
    name: 'GOLD BIJILI 50 PCS (600box/case)',
    qty: '50 pkt',
    rate: 12.5,
    sellPrice: 40,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 56,
    name: 'Red Bijili Goat 50 Pcs (600box/case)',
    qty: '50 pcs',
    rate: 11.5,
    sellPrice: 40,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 57,
    name: 'GOLD BIJILI 100 PCS (360box/case)',
    qty: '150 pkt',
    rate: 25.0,
    sellPrice: 60,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 58,
    name: 'Red Bijili Goat 100 Pcs (360box/case)',
    qty: '150 pcs',
    rate: 23.0,
    sellPrice: 60,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 59,
    name: '1000 Wala Sandel (36box/case)',
    qty: '25 pcs',
    rate: 110.0,
    sellPrice: 220,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 60,
    name: '10000 Wala Sandel (6box/case)',
    qty: '3 pcs',
    rate: 1100.0,
    sellPrice: 2400,
    cat: 'Sound Crackers',
  },
  {
    page: 2,
    code: 61,
    name: '12 SHOT RIDER ABIS (48box/case)',
    qty: '5 pcs',
    rate: 140.0,
    sellPrice: 250,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 62,
    name: '15 Shots Nalla (24box/case)',
    qty: '2 pcs',
    rate: 240.0,
    sellPrice: 400,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 63,
    name: '30 SHOTS NALLA (18box/case)',
    qty: '10 pcs',
    rate: 380.0,
    sellPrice: 700,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 64,
    name: '60 SHOTS NALLA (12box/case)',
    qty: '8 pcs',
    rate: 760.0,
    sellPrice: 1200,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 65,
    name: 'Chota Fancy 300 Pcs (300box/case)',
    qty: '5 pcs',
    rate: 33.0,
    sellPrice: 80,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 66,
    name: '2 IN COMMENT S (100box/case)',
    qty: '5 pcs',
    rate: 90.0,
    sellPrice: 180,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 67,
    name: '3.5 COMMENT AK (36box/case)',
    qty: '2 pcs',
    rate: 280.0,
    sellPrice: 400,
    cat: 'Rockets & Fancy',
  },
  {
    page: 2,
    code: 68,
    name: '4 IN COMMENT RSR (30box/case)',
    qty: '2 pcs',
    rate: 320.0,
    sellPrice: 450,
    cat: 'Rockets & Fancy',
  },

  // PAGE 3
  {
    page: 3,
    code: 1,
    name: '2 3/4 BIRD (1500box/case)',
    qty: '300 pcs',
    rate: 9.2,
    sellPrice: 30,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 2,
    name: '4 Laxmi Sethu (500box/case)',
    qty: '150 pcs',
    rate: 21.0,
    sellPrice: 45,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 3,
    name: '4 IN DELUX LAXMI MITHRAM (300box/case)',
    qty: '100 pcs',
    rate: 28.0,
    sellPrice: 50,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 4,
    name: 'GOLD LAXMI MITHRAM (300box/case)',
    qty: '120 pcs',
    rate: 28.0,
    sellPrice: 50,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 5,
    name: '5 Marvel Mithram (250box/case)',
    qty: '50 pcs',
    rate: 38.0,
    sellPrice: 70,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 6,
    name: '6 Batman Mithram (200box/case)',
    qty: '50 pcs',
    rate: 48.0,
    sellPrice: 100,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 7,
    name: '4 IN SUPER DELUX KUMKI (250box/case)',
    qty: '30 pcs',
    rate: 55.0,
    sellPrice: 120,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 8,
    name: '5 IN SUPER DELUX BULL ROHINI (150box/case)',
    qty: '30 pcs',
    rate: 65.0,
    sellPrice: 130,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 9,
    name: '6 IN SUPER DELUX LION ROHINI (120box/case)',
    qty: '50 pcs',
    rate: 75.0,
    sellPrice: 150,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 10,
    name: 'FLOWER POT BIG ORIENT (240box/case)',
    qty: '120 BOX',
    rate: 60.0,
    sellPrice: 100,
    cat: 'Fountains',
  },
  {
    page: 3,
    code: 11,
    name: 'FLOWER POT DELUX 5 PCS GURU (80box/case)',
    qty: '10 BOX',
    rate: 150.0,
    sellPrice: 260,
    cat: 'Fountains',
  },
  {
    page: 3,
    code: 12,
    name: 'MIRACLE POTS (20box/case)',
    qty: '10 BOX',
    rate: 600.0,
    sellPrice: 1000,
    cat: 'Fountains',
  },
  {
    page: 3,
    code: 13,
    name: 'TRICOLOUR FOUNTAIN RSR (40box/case)',
    qty: '15 BOX',
    rate: 250.0,
    sellPrice: 400,
    cat: 'Fountains',
  },
  {
    page: 3,
    code: 14,
    name: 'GC ASHOKA BLUESTAR (300box/case)',
    qty: '120 BOX',
    rate: 50.0,
    sellPrice: 150,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 3,
    code: 15,
    name: 'G C SPECIAL BLUESTAR SPINNER (200box/case)',
    qty: '80 BOX',
    rate: 75.0,
    sellPrice: 150,
    cat: 'Chakkars / Wheels',
  },
  {
    page: 3,
    code: 16,
    name: 'G C DELUX BLUESTAR (150box/case)',
    qty: '75 BOX',
    rate: 100.0,
    sellPrice: 200,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 3,
    code: 17,
    name: 'Bullet Bomb (600box/case)',
    qty: '150 BOX',
    rate: 20.0,
    sellPrice: 80,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 18,
    name: 'KING OF KING A (200box/case)',
    qty: '50 BOX',
    rate: 82.0,
    sellPrice: 200,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 19,
    name: 'CLASSIC BOMB A (170box/case)',
    qty: '100 BOX',
    rate: 98.0,
    sellPrice: 250,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 20,
    name: 'Classic Bomb Sethu (180box/case)',
    qty: '50 BOX',
    rate: 100.0,
    sellPrice: 250,
    cat: 'Bombs & Heavy',
  },
  {
    page: 3,
    code: 21,
    name: 'Kit Kat Makkalselvi (600box/case)',
    qty: '100 pcs',
    rate: 24.0,
    sellPrice: 80,
    cat: 'Sound Crackers',
  },
  {
    page: 3,
    code: 22,
    name: 'DRAGON FIGHT (600box/case)',
    qty: '50 BOX',
    rate: 26.0,
    sellPrice: 80,
    cat: 'Sound Crackers',
  },
  {
    page: 3,
    code: 23,
    name: 'ELECTRIC STONES (1000box/case)',
    qty: '100 BOX',
    rate: 6.0,
    sellPrice: 50,
    cat: 'Novelty & Kids',
  },
  {
    page: 3,
    code: 24,
    name: 'ZEE BOOMBA (1000box/case)',
    qty: '50 BOX',
    rate: 6.0,
    sellPrice: 50,
    cat: 'Novelty & Kids',
  },
  {
    page: 3,
    code: 25,
    name: 'ZEEBOOMBA SPL (100box/case)',
    qty: '5 BOX',
    rate: 95.0,
    sellPrice: 200,
    cat: 'Novelty & Kids',
  },
  {
    page: 3,
    code: 26,
    name: '15 in Pencils (240box/case)',
    qty: '30 pcs',
    rate: 65.0,
    sellPrice: 150,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 3,
    code: 27,
    name: '28 CHORSA 1500PKT (1500box/case)',
    qty: '500 pcs',
    rate: 12.5,
    sellPrice: 40,
    cat: 'Sound Crackers',
  },
  {
    page: 3,
    code: 28,
    name: '20 DELUX ABIS (375box/case)',
    qty: '50 pcs',
    rate: 26.0,
    sellPrice: 50,
    cat: 'Sound Crackers',
  },
  {
    page: 3,
    code: 29,
    name: '50 Delux LN (150box/case)',
    qty: '100 pcs',
    rate: 85.0,
    sellPrice: 150,
    cat: 'Sound Crackers',
  },
  {
    page: 3,
    code: 30,
    name: '100 DELUX LN (75box/case)',
    qty: '50 pcs',
    rate: 170.0,
    sellPrice: 250,
    cat: 'Sound Crackers',
  },
  {
    page: 3,
    code: 31,
    name: 'COLOUR KOTI ANGALESWARI (50box/case)',
    qty: '9 BOX',
    rate: 210.0,
    sellPrice: 400,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 3,
    code: 32,
    name: '1 1/2 TWINKLING THREAD (500box/case)',
    qty: '50 BOX',
    rate: 21.0,
    sellPrice: 50,
    cat: 'Sparklers & Deepam',
  },

  // PAGE 4
  {
    page: 4,
    code: 1,
    name: '36 ITEM GB HARI HARA (25box/case)',
    qty: '10 BOX',
    rate: 540.0,
    sellPrice: 750,
    cat: 'Gift Boxes',
  },
  {
    page: 4,
    code: 2,
    name: '40 ITEM GB HARI HARA (20box/case)',
    qty: '8 BOX',
    rate: 620.0,
    sellPrice: 850,
    cat: 'Gift Boxes',
  },
  {
    page: 4,
    code: 3,
    name: '30 ITEM GB HARI HARA (26box/case)',
    qty: '5 BOX',
    rate: 440.0,
    sellPrice: 650,
    cat: 'Gift Boxes',
  },
  {
    page: 4,
    code: 4,
    name: '12 Step Liya (30box/case)',
    qty: '2 pcs',
    rate: 380.0,
    sellPrice: 550,
    cat: 'Rockets & Fancy',
  },
  {
    page: 4,
    code: 5,
    name: 'Clay Fp (100box/case)',
    qty: '20 pcs',
    rate: 28.0,
    sellPrice: 60,
    cat: 'Fountains',
  },

  // PAGE 5
  {
    page: 5,
    code: 1,
    name: 'FLOWER POT ASHOKA ORIENT (100box/case)',
    qty: '100 BOX',
    rate: 90.0,
    sellPrice: 170,
    cat: 'Fountains',
  },
  {
    page: 5,
    code: 2,
    name: 'FLOWER POT ASHOKA FAMOUS (100box/case)',
    qty: '100 BOX',
    rate: 85.0,
    sellPrice: 160,
    cat: 'Fountains',
  },
  {
    page: 5,
    code: 3,
    name: 'COLOUR KOTI FAMOUS (60box/case)',
    qty: '60 BOX',
    rate: 145.0,
    sellPrice: 250,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 5,
    code: 4,
    name: 'COLOUR KOTI ORIENT (60box/case)',
    qty: '60 BOX',
    rate: 155.0,
    sellPrice: 280,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 5,
    code: 5,
    name: 'COLOUR KOTI DLX FAMOUS (40box/case)',
    qty: '40 BOX',
    rate: 245.0,
    sellPrice: 350,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 5,
    code: 6,
    name: 'DIZZILING POTS 10 PCS (30box/case)',
    qty: '30 BOX',
    rate: 360.0,
    sellPrice: 550,
    cat: 'Fountains',
  },
  {
    page: 5,
    code: 7,
    name: 'G C SPECIAL (180box/case)',
    qty: '180 BOX',
    rate: 65.0,
    sellPrice: 120,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 5,
    code: 8,
    name: 'G C DELUX DEEPAM (150box/case)',
    qty: '150 BOX',
    rate: 95.0,
    sellPrice: 120,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 5,
    code: 9,
    name: '2000 Wala Sandel (24box/case)',
    qty: '24 pcs',
    rate: 220.0,
    sellPrice: 400,
    cat: 'Sound Crackers',
  },
  {
    page: 5,
    code: 10,
    name: '5000 Wala Sandel (8box/case)',
    qty: '16 pcs',
    rate: 550.0,
    sellPrice: 850,
    cat: 'Sound Crackers',
  },
  {
    page: 5,
    code: 11,
    name: '120 Shots Deepam (6box/case)',
    qty: '12 pcs',
    rate: 1800.0,
    sellPrice: 3200,
    cat: 'Rockets & Fancy',
  },
  {
    page: 5,
    code: 12,
    name: 'POP POP (24box/case)',
    qty: '48 BOX',
    rate: 271.0,
    sellPrice: 500,
    cat: 'Novelty & Kids',
  },
  {
    page: 5,
    code: 13,
    name: 'BATHILU (25box/case)',
    qty: '150 pcs',
    rate: 5.5,
    sellPrice: 15,
    cat: 'Novelty & Kids',
  },
  {
    page: 5,
    code: 14,
    name: 'WONDER THROW (40box/case)',
    qty: '40 BOX',
    rate: 65.0,
    sellPrice: 120,
    cat: 'Novelty & Kids',
  },

  // PAGES 6 & 7
  {
    page: 6,
    code: 1,
    name: '7 cm Electric Rsr (300box/case)',
    qty: '300 BOX',
    rate: 6.3,
    sellPrice: 40,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 6,
    code: 2,
    name: '10 CM ELECTRIC DEEPAM (100box/case)',
    qty: '100 BOX',
    rate: 13.5,
    sellPrice: 60,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 6,
    code: 3,
    name: '12 CM GREEN RAGA (100box/case)',
    qty: '100 pcs',
    rate: 23.0,
    sellPrice: 70,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 6,
    code: 4,
    name: '15 CM ELECTRIC DEEPAM (100box/case)',
    qty: '300 BOX',
    rate: 26.0,
    sellPrice: 80,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 6,
    code: 5,
    name: '15 CM COLOUR DEEPAM (100box/case)',
    qty: '300 BOX',
    rate: 28.0,
    sellPrice: 100,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 6,
    code: 6,
    name: '30 CM COLOUR DEEPAM (100box/case)',
    qty: '300 BOX',
    rate: 28.0,
    sellPrice: 120,
    cat: 'Sparklers & Deepam',
  },
  {
    page: 6,
    code: 7,
    name: '30 CM ELECTRIC DEEPAM (100box/case)',
    qty: '300 BOX',
    rate: 26.0,
    sellPrice: 120,
    cat: 'Sparklers & Deepam',
  },

  // PAGE 8
  {
    page: 8,
    code: 1,
    name: 'RAINBOW FOG CODE : 175 (36box/case)',
    qty: '5 BOX',
    rate: 450.0,
    sellPrice: 700,
    cat: 'Fountains',
  },
  {
    page: 8,
    code: 2,
    name: 'FLOWER POT SPECIAL CODE : 543 (90box/case)',
    qty: '25 pcs',
    rate: 182.0,
    sellPrice: 300,
    cat: 'Fountains',
  },
  {
    page: 8,
    code: 3,
    name: 'FLOWER POT GAINT CODE : 544 (35box/case)',
    qty: '15 BOX',
    rate: 397.0,
    sellPrice: 550,
    cat: 'Fountains',
  },
  {
    page: 8,
    code: 4,
    name: 'ZAMIN CHAKKAR ASHOKA CODE : 047 (150box/case)',
    qty: '20 pcs',
    rate: 94.0,
    sellPrice: 180,
    cat: 'Chakkars / Wheels',
  },
  {
    page: 8,
    code: 5,
    name: 'CHAT CHAT CODE : 173 (360box/case)',
    qty: '20 BOX',
    rate: 71.0,
    sellPrice: 120,
    cat: 'Novelty & Kids',
  },
  {
    page: 8,
    code: 6,
    name: '30 CM GOLD CODE : 380 (150box/case)',
    qty: '30 BOX',
    rate: 76.0,
    sellPrice: 130,
    cat: 'Sparklers & Deepam',
  },
];

const CATEGORIES = [
  'All',
  'Sparklers & Deepam',
  'Fountains',
  'Chakkars / Wheels',
  'Bombs & Heavy',
  'Rockets & Fancy',
  'Sound Crackers',
  'Gift Boxes',
  'Novelty & Kids',
];
const PAGES = ['All', 'Pg 1', 'Pg 2', 'Pg 3', 'Pg 4', 'Pg 5', 'Pg 6', 'Pg 8'];
const PCT_PRESETS = [-18, -15, -12, -10, -8, -5, 0, 5, 10, 15, 20, 25];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPage, setSelectedPage] = useState('All');
  const [customPct, setCustomPct] = useState(0); // Dynamic Percentage Adjustment
  const [isOwnerView, setIsOwnerView] = useState(true); // Toggle between Owner & Counter Mode
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reset All Filters Handler
  const resetAllFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedPage('All');
    setCustomPct(0);
  };

  // Shortcut key for search '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('posSearchInput')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate adjusted price with percentage
  const getAdjustedPrice = (basePrice) => {
    if (customPct === 0) return basePrice;
    return Math.round(basePrice * (1 + customPct / 100));
  };

  // SEARCH AND FILTER ENGINE
  const filteredItems = useMemo(() => {
    return INVOICE_ITEMS.filter((item) => {
      const matchCat =
        selectedCategory === 'All' || item.cat === selectedCategory;
      const matchPg =
        selectedPage === 'All' || selectedPage === `Pg ${item.page}`;
      const q = search.toLowerCase().trim();
      if (!q) return matchCat && matchPg;

      const matchCode = item.code.toString() === q || `#${item.code}` === q;
      const matchName = item.name.toLowerCase().includes(q);
      const matchCatName = item.cat.toLowerCase().includes(q);
      const matchPage =
        `page ${item.page}`.includes(q) ||
        `pg ${item.page}`.includes(q) ||
        `p${item.page}` === q;
      const matchPrice =
        item.sellPrice.toString() === q || item.rate.toString() === q;

      return (
        matchCat &&
        matchPg &&
        (matchCode || matchName || matchCatName || matchPage || matchPrice)
      );
    });
  }, [search, selectedCategory, selectedPage]);

  const addToCart = (item) => {
    const adjustedSellPrice = getAdjustedPrice(item.sellPrice);
    setCart((prev) => {
      const idx = prev.findIndex(
        (c) => c.page === item.page && c.code === item.code
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx].cartQty += 1;
        return next;
      }
      return [
        ...prev,
        {
          ...item,
          sellPrice: adjustedSellPrice,
          baseSellPrice: item.sellPrice,
          cartQty: 1,
        },
      ];
    });
  };

  const updateCartQty = (page, code, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.page === page && item.code === code) {
            const newQty = item.cartQty + delta;
            return newQty > 0 ? { ...item, cartQty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const cartTotals = useMemo(() => {
    let itemsCount = 0;
    let wholesaleCost = 0;
    let grandTotal = 0;

    cart.forEach((item) => {
      itemsCount += item.cartQty;
      wholesaleCost += item.rate * item.cartQty;
      grandTotal += item.sellPrice * item.cartQty;
    });

    const profit = grandTotal - wholesaleCost;
    return { itemsCount, wholesaleCost, grandTotal, profit };
  }, [cart]);

  const printReceipt = () => {
    if (cart.length === 0) return;
    const printWin = window.open('', '_blank', 'width=380,height=600');
    let content = `
      <html>
      <head>
        <title>Bill Slip - MS REDDY CRACKERS</title>
        <style>
          body { font-family: monospace; padding: 12px; width: 280px; margin: auto; font-size: 12px; }
          .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 8px; margin-bottom: 8px; }
          .flex { display: flex; justify-content: space-between; margin-bottom: 4px; }
          .bold { font-weight: bold; }
          .border-top { border-top: 1px dashed #000; padding-top: 8px; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2 style="margin:0; font-size: 16px;">MS REDDY CRACKERS</h2>
          <div style="font-size:11px; margin-top:2px;">Counter Estimate Bill</div>
          <div style="font-size:10px; color:#555;">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
        </div>
        <div>
    `;

    cart.forEach((item) => {
      content += `
        <div>#${item.code} ${item.name.substring(0, 24)}</div>
        <div class="flex">
          <span>${item.cartQty} x ₹${item.sellPrice}</span>
          <span>₹${item.sellPrice * item.cartQty}</span>
        </div>
      `;
    });

    content += `
        </div>
        <div class="border-top flex bold" style="font-size: 15px; margin-top: 10px;">
          <span>TOTAL BILL:</span>
          <span>₹${cartTotals.grandTotal.toLocaleString('en-IN')}</span>
        </div>
        <div style="text-align:center; margin-top: 15px; font-size: 11px;">
          Thank You! Visit MS REDDY CRACKERS Again.
        </div>
        <script>window.onload = function() { window.print(); window.close(); }</script>
      </body>
      </html>
    `;
    printWin.document.write(content);
    printWin.document.close();
  };

  const isFiltered =
    search !== '' ||
    selectedCategory !== 'All' ||
    selectedPage !== 'All' ||
    customPct !== 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-rose-600 selection:text-white pb-16 lg:pb-0">
      {/* HEADER & CONTROLS */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto p-2 sm:p-3 space-y-2">
          {/* Top Title & Mode Toggle Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-rose-600 to-amber-500 p-1.5 rounded-lg shadow-md">
                <Store className="w-5 h-5 text-slate-950 font-black" />
              </div>
              <div>
                <h1 className="font-black text-sm sm:text-lg tracking-tight text-white leading-none">
                  MS REDDY CRACKERS
                </h1>
                <p className="text-[10px] text-amber-400 font-mono mt-0.5">
                  {isOwnerView
                    ? 'OWNER DASHBOARD • COST & MARGINS UNLOCKED'
                    : 'COUNTER MODE • CUSTOMER DISPLAY'}
                </p>
              </div>
            </div>

            {/* Mode Switcher & Reset Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOwnerView(!isOwnerView)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-sm ${
                  isOwnerView
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
                title="Switch view mode"
              >
                {isOwnerView ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Owner View</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Counter View</span>
                  </>
                )}
              </button>

              {isFiltered && (
                <button
                  onClick={resetAllFilters}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 shadow-sm"
                  title="Reset all search queries, categories, pages, and percentage adjustments"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="posSearchInput"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code, item name, page..."
              className="w-full pl-9 pr-9 py-2 bg-slate-950 text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:border-rose-500 text-sm font-medium outline-none transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* PERCENTAGE PRESET BUTTONS (ONLY VISIBLE IN OWNER VIEW) */}
          {isOwnerView && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 border-t border-slate-800/60 pt-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 mr-1">
                PRICE %:
              </span>
              {PCT_PRESETS.map((pct) => {
                const isSelected = customPct === pct;
                const isDiscount = pct < 0;
                const isMarkup = pct > 0;

                return (
                  <button
                    key={pct}
                    onClick={() => setCustomPct(pct)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition border ${
                      isSelected
                        ? isDiscount
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                          : isMarkup
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                          : 'bg-slate-700 text-white border-slate-600'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {pct > 0 ? `+${pct}%` : `${pct}%`}
                  </button>
                );
              })}
            </div>
          )}

          {/* FILTERS ROW: CATEGORIES & PAGES */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                    selectedCategory === cat
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Invoice Page Tabs */}
            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 border-slate-800/60 pt-1.5 sm:pt-0">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-mono text-amber-500 font-bold shrink-0">
                  PAGE:
                </span>
                {PAGES.map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setSelectedPage(pg)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold whitespace-nowrap border ${
                      selectedPage === pg
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-3 flex flex-col lg:flex-row gap-3">
        {/* ITEM CATALOG TABLE */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Header Bar showing item count */}
          <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div>
              FOUND{' '}
              <span className="text-white font-bold">
                {filteredItems.length}
              </span>{' '}
              ITEMS
            </div>
            <div className="text-[11px] flex items-center gap-2">
              {isOwnerView && customPct !== 0 && (
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    customPct < 0
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {customPct > 0
                    ? `+${customPct}% Markup`
                    : `${customPct}% Discount`}{' '}
                  Active
                </span>
              )}
              <span>
                <strong className="text-blue-400">Blue</strong> = Selling Price
              </span>
            </div>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-250px)]">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Search className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-300">
                  No matching items found
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try resetting filters or search for codes like 37, 45, 69.
                </p>
              </div>
            ) : (
              filteredItems.map((item) => {
                const effectiveSellPrice = getAdjustedPrice(item.sellPrice);
                const profit = effectiveSellPrice - item.rate;
                const marginPct = Math.round(
                  (profit / effectiveSellPrice) * 100
                );

                return (
                  <div
                    key={`${item.page}-${item.code}`}
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-sm transition"
                  >
                    {/* Item Meta & Name */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-900/50 px-1.5 py-0.2 rounded">
                          #{item.code}
                        </span>
                        {isOwnerView && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            Pg {item.page}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 truncate">
                          • {item.qty}
                        </span>
                        <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                          {item.cat}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-white leading-snug truncate">
                        {item.name}
                      </h3>

                      {/* OWNER ONLY METRICS */}
                      {isOwnerView && (
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                          <span>Rate: ₹{item.rate.toFixed(2)}</span>
                          <span className="text-emerald-400 font-bold">
                            +₹{profit.toFixed(0)} ({marginPct}%)
                          </span>
                          {customPct !== 0 && (
                            <span className="text-slate-500 line-through">
                              Base ₹{item.sellPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selling Price & Quick Add */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="font-mono text-lg sm:text-2xl font-black text-blue-400 leading-none">
                          ₹{effectiveSellPrice}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        className="w-10 h-10 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition"
                        title="Add to Bill"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        {/* BILL COUNTER SIDEBAR */}
        <aside
          className={`
          fixed inset-y-0 right-0 z-40 w-full max-w-xs sm:max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-80 xl:w-96 lg:rounded-2xl lg:border
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        >
          {/* Header */}
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between lg:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-sm text-white">
                MS REDDY Counter Slip
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <ShoppingCart className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-xs font-semibold">Bill slip is empty</p>
                <p className="text-[11px] mt-1 text-slate-600">
                  Tap '+' next to items to add to bill slip
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const lineTotal = item.sellPrice * item.cartQty;

                return (
                  <div
                    key={`cart-${item.page}-${item.code}`}
                    className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">
                        #{item.code} {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        ₹{item.sellPrice} × {item.cartQty} ={' '}
                        <span className="text-blue-400 font-bold">
                          ₹{lineTotal}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
                      <button
                        onClick={() => updateCartQty(item.page, item.code, -1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white rounded font-bold hover:bg-slate-800"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">
                        {item.cartQty}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.page, item.code, 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white rounded font-bold hover:bg-slate-800"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Totals */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3 lg:rounded-b-2xl">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items:</span>
                <span className="font-mono font-bold text-white">
                  {cartTotals.itemsCount}
                </span>
              </div>

              {isOwnerView && (
                <>
                  <div className="flex justify-between text-slate-400">
                    <span>Wholesale Cost:</span>
                    <span className="font-mono">
                      ₹{cartTotals.wholesaleCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Est. Profit:</span>
                    <span className="font-mono font-bold">
                      ₹{cartTotals.profit.toFixed(2)}
                    </span>
                  </div>
                </>
              )}

              <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline">
                <span className="font-extrabold text-white text-base">
                  Grand Total:
                </span>
                <span className="text-2xl font-black text-blue-400 font-mono">
                  ₹{cartTotals.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={printReceipt}
              disabled={cart.length === 0}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
            >
              <Printer className="w-4 h-4" /> Print Counter Bill
            </button>
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM FIXED BILL BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-800 p-2.5 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">
            Current Bill ({cartTotals.itemsCount} items)
          </div>
          <div className="text-xl font-black font-mono text-blue-400">
            ₹{cartTotals.grandTotal.toLocaleString('en-IN')}
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-rose-600 active:bg-rose-700 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30"
        >
          <span>View Slip</span>
        </button>
      </div>

      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </div>
  );
}
