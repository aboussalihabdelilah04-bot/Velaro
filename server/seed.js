require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('./models/AdminUser');
const Car = require('./models/Car');
const Motorcycle = require('./models/Motorcycle');
const Villa = require('./models/Villa');
const Excursion = require('./models/Excursion');
const Transfer = require('./models/Transfer');
const Pack = require('./models/Pack');
const Review = require('./models/Review');
const Settings = require('./models/Settings');
const Language = require('./models/Language');

const CAR_DATA = [
  { name: "Dacia Logan", brand: "Dacia", year: 2025, fuel: "Diesel", transmission: "Manuelle", seats: 5, pricePerDay: 300, category: "Économique", image: "images/cars/dacia-logan/main.webp", features: ["Climatisation", "Bluetooth", "GPS"], available: true, rating: 4.5, reviews: 23 },
  { name: "Renault Megan", brand: "Renault", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 400, category: "Compacte", image: "images/cars/renault-megan/main.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.6, reviews: 31 },
  { name: "Peugeot 208", brand: "Peugeot", year: 2024, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 350, category: "Compacte", image: "images/cars/peugeot-208/main.webp", features: ["Climatisation", "Bluetooth", "Écran tactile", "Caméra recul"], available: true, rating: 4.7, reviews: 100 },
  { name: "Volkswagen Golf 7", brand: "Volkswagen", year: 2024, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 1200, category: "Compacte", image: "images/cars/volkswagen-golf/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Toit panoramique", "Caméra 360", "Son Harman Kardon"], available: true, rating: 5, reviews: 690 },
  { name: "Mercedes Classe C", brand: "Mercedes", year: 2025, fuel: "Diesel", transmission: "Automatique", seats: 5, pricePerDay: 1200, category: "Premium", image: "images/cars/mercedes-classe-c/main.webp", features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "Toit panoramique", "Son Harman Kardon"], available: true, rating: 4.9, reviews: 56 },
  { name: "Dacia Sandero Stepway", brand: "Dacia", year: 2025, fuel: "Diesel", transmission: "Manuelle", seats: 5, pricePerDay: 300, category: "Économique", image: "images/cars/dacia-sandero-stepway/main.webp", features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "Sièges chauffants"], available: true, rating: 4.9, reviews: 67 },
  { name: "Range Rover Evoque", brand: "Land Rover", year: 2024, fuel: "Diesel", transmission: "Automatique", seats: 5, pricePerDay: 1200, category: "SUV Premium", image: "images/cars/range-rover-evoque/main.webp", features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "4x4", "Toit panoramique", "Meridian Sound"], available: true, rating: 5.0, reviews: 38 },
  { name: "Hyundai Accent", brand: "Hyundai", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 350, category: "Économique", image: "images/cars/hyundai-accent/main.webp", features: ["Climatisation", "Cuir", "GPS"], available: true, rating: 4.9, reviews: 29 },
  { name: "Hyundai Tucson", brand: "Hyundai", year: 2025, fuel: "Diesel", transmission: "Automatique", seats: 5, pricePerDay: 800, category: "SUV", image: "images/cars/hyundai-tucson/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Caméra 360", "Toit panoramique"], available: true, rating: 5, reviews: 200 },
  { name: "Kia Sportage", brand: "Kia", year: 2025, fuel: "Diesel", transmission: "Automatique", seats: 5, pricePerDay: 650, category: "SUV", image: "images/cars/kia-sportage/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Sièges chauffants"], available: true, rating: 4.6, reviews: 97 },
  { name: "Volkswagen T-Roc", brand: "Volkswagen", year: 2025, fuel: "Diesel", transmission: "Automatique", seats: 5, pricePerDay: 900, category: "SUV Premium", image: "images/cars/volkswagen-t-roc/main.webp", features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "4x4", "Toit panoramique"], available: true, rating: 5.0, reviews: 410 },
  { name: "Fiat 500", brand: "Fiat", year: 2025, fuel: "Essence", transmission: "Manuelle", seats: 4, pricePerDay: 400, category: "Économique", image: "images/cars/fiat-500/main.webp", features: ["Climatisation", "Bluetooth"], available: true, rating: 4.4, reviews: 70 },
  { name: "Dacia Jogger", brand: "Dacia", year: 2025, fuel: "Diesel", transmission: "Manuelle", seats: 7, pricePerDay: 350, category: "Économique", image: "images/cars/dacia-jogger/main.webp", features: ["Climatisation", "GPS", "Bluetooth"], available: true, rating: 4.7, reviews: 33 },
  { name: "Dacia Sandero", brand: "Dacia", year: 2025, fuel: "Diesel", transmission: "Manuelle", seats: 5, pricePerDay: 300, category: "Économique", image: "images/cars/dacia-sandero/main.webp", features: ["Climatisation", "Bluetooth", "GPS"], available: true, rating: 4.5, reviews: 23 },
  { name: "Hyundai Staria", brand: "Hyundai", year: 2025, fuel: "Diesel", transmission: "Automatique", seats: 9, pricePerDay: 1200, category: "Van", image: "images/cars/hyundai-staria/main.webp", features: ["Climatisation", "Cuir", "GPS"], available: true, rating: 4.9, reviews: 29 },
  { name: "Renault Clio 5", brand: "Renault", year: 2024, fuel: "Diesel", transmission: "Manuelle", seats: 5, pricePerDay: 400, category: "Économique", image: "images/cars/renault-clio5/2024.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.8, reviews: 310 },
  { name: "Renault Clio 5 2025", brand: "Renault", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 400, category: "Économique", image: "images/cars/renault-clio5/2025.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.8, reviews: 310 },
  { name: "Renault Arkana", brand: "Renault", year: 2025, fuel: "Hybride", transmission: "Automatique", seats: 5, pricePerDay: 500, category: "Économique", image: "images/cars/renault-arkana/main.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.8, reviews: 109 },
  { name: "Renault Clio 5 Alpine", brand: "Renault", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 700, category: "Économique", image: "images/cars/renault-clio5-alpine/main.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.9, reviews: 519 },
  { name: "Peugeot 3008", brand: "Peugeot", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 350, category: "Économique", image: "images/cars/peugeot-3008/main.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.7, reviews: 254 },
  { name: "Kia Picanto", brand: "Kia", year: 2024, fuel: "Essence", transmission: "Manuelle", seats: 5, pricePerDay: 300, category: "Économique", image: "images/cars/kia-picanto/main.webp", features: ["Climatisation", "Bluetooth", "Caméra recul"], available: true, rating: 4.5, reviews: 254 },
  { name: "Volkswagen Golf 8", brand: "Volkswagen", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 1500, category: "Compacte", image: "images/cars/volkswagen-golf/8.webp", features: ["Climatisation", "Bluetooth", "GPS", "Toit panoramique", "Caméra 360", "Son Harman Kardon"], available: true, rating: 5, reviews: 667 },
  { name: "Toyota Prado", brand: "Toyota", year: 2025, fuel: "Diesel", transmission: "Automatique", seats: 5, pricePerDay: 2600, category: "SUV Premium", image: "images/cars/toyota-prado/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Caméra 360", "Son Harman Kardon"], available: true, rating: 4.9, reviews: 543 },
  { name: "Toyota TX", brand: "Toyota", year: 2019, fuel: "Diesel", transmission: "Manuelle", seats: 7, pricePerDay: 1800, category: "SUV Premium", image: "images/cars/toyota-TX/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Caméra 360", "Son Harman Kardon"], available: true, rating: 4.7, reviews: 321 },
  { name: "Audi A3 S line", brand: "Audi", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 1400, category: "SUV Premium", image: "images/cars/audi-a3/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Toit panoramique", "Caméra 360", "Son Harman Kardon"], available: true, rating: 5, reviews: 511 },
  { name: "Audi Q3", brand: "Audi", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 1400, category: "SUV Premium", image: "images/cars/audi-Q3/main.webp", features: ["Climatisation", "Bluetooth", "GPS", "Toit panoramique", "Caméra 360", "Son Harman Kardon"], available: true, rating: 5, reviews: 511 },
  { name: "Porsche Macan", brand: "Porsche", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 1500, category: "SUV Premium", image: "images/cars/porsche/macan.webp", features: ["Climatisation", "Bluetooth", "GPS", "Toit panoramique", "Caméra 360", "Son Harman Kardon"], available: true, rating: 5, reviews: 511 },
  { name: "Kia Stonic", brand: "Kia", year: 2025, fuel: "Essence", transmission: "Automatique", seats: 5, pricePerDay: 400, category: "Économique", image: "images/cars/kia-stonic/main.png", features: ["Climatisation", "Bluetooth", "GPS"], available: true, rating: 4.6, reviews: 45 }
];

const MOTO_DATA = [
  { name: "Honda SH 350", brand: "Honda", year: 2024, engine: "350cc", type: "Scooter", fuel: "Essence", pricePerDay: 350, category: "Moto", image: "images/motos/Honda-sh-350/main.webp", features: ["ABS", "Casque inclus"], available: true, rating: 4.8, reviews: 45 },
  { name: "Honda X-ADV", brand: "Honda", year: 2024, engine: "750cc", type: "Scooter", fuel: "Essence", pricePerDay: 600, category: "Moto", image: "images/motos/honda-x-adv/main.webp", features: ["ABS", "Casque inclus", "Bluetooth"], available: true, rating: 4.9, reviews: 38 },
  { name: "Yamaha MT-07", brand: "Yamaha", year: 2024, engine: "700cc", type: "Naked", fuel: "Essence", pricePerDay: 500, category: "Moto", image: "images/motos/yamaha-mt07/main.webp", features: ["ABS", "Casque inclus", "Bluetooth"], available: true, rating: 4.9, reviews: 62 },
  { name: "Yamaha TMAX 560", brand: "Yamaha", year: 2024, engine: "560cc", type: "Scooter", fuel: "Essence", pricePerDay: 550, category: "Moto", image: "images/motos/yamaha-timax-560/main.webp", features: ["ABS", "Casque inclus", "Bluetooth"], available: true, rating: 4.8, reviews: 55 }
];

const VILLA_DATA = [
  { name: "Villa Prestigia Topaze", location: "Marrakech", pricePerNight: 1800, bedrooms: 3, bathrooms: 2, maxGuests: 6, floors: 2, elevator: true, pool: true, wifi: true, ac: true, kitchen: true, garden: true, parking: true, terrace: true, tv: true, description: "Villa haut standing de 2 étages avec ascenseur. 3 chambres spacieuses, salon moderne et salon marocain traditionnel. Grande terrasse avec vue sur la piscine.", image: "images/houses/prestigia/5.jpg", images: ["images/houses/prestigia/5.jpg", "images/houses/prestigia/1.jpg", "images/houses/prestigia/2.jpg", "images/houses/prestigia/3.jpg", "images/houses/prestigia/4.jpg"], features: ["2 étages avec ascenseur", "3 chambres", "Salon moderne", "Salon marocain", "Grande terrasse", "Vue piscine", "Climatisation", "Wi-Fi", "Parking privé"], rating: 4.5, reviews: 440, available: true },
  { name: "Villa Route d'Amezmiz", location: "Route d'Amezmiz, Marrakech", pricePerNight: 9000, bedrooms: 5, bathrooms: 4, maxGuests: 10, floors: 1, pool: true, wifi: true, ac: true, kitchen: true, garden: true, parking: true, terrace: true, tv: true, description: "Villa de luxe située sur la Route d'Amezmiz. 5 chambres élégantes, grande piscine privée et jardin paysager.", image: "images/houses/amezmiz/main.jpg", images: ["images/houses/amezmiz/main.jpg", "images/houses/amezmiz/1.jpg", "images/houses/amezmiz/2.jpg", "images/houses/amezmiz/3.jpg", "images/houses/amezmiz/4.jpg"], features: ["5 chambres", "Villa de luxe", "Grande piscine privée", "Grand jardin", "Salon moderne", "Cuisine équipée", "Climatisation", "Wi-Fi", "Parking privé"], rating: 5.0, reviews: 680, available: true },
  { name: "Appartement Guéliz", location: "Guéliz, Marrakech", pricePerNight: 600, bedrooms: 1, bathrooms: 1, maxGuests: 2, floors: 1, wifi: true, ac: true, kitchen: true, parking: true, terrace: true, tv: true, description: "Appartement moderne au quartier de Guéliz. 1 chambre, salon, cuisine équipée, télévision et Wi-Fi.", image: "images/houses/gueliz/main.jpg", images: ["images/houses/gueliz/main.jpg", "images/houses/gueliz/1.jpg", "images/houses/gueliz/2.jpg"], features: ["1 chambre", "Salon", "Cuisine équipée", "Télévision", "Wi-Fi", "Appartement moderne"], rating: 4.5, reviews: 240, available: true }
];

const EXCURSION_DATA = [
  { name: "Désert d'Agafay", city: "Marrakech", duration: "Demi-journée", durationHours: 4, price: 350, difficulty: "Facile", image: "images/excursions/desert-agafay/main.webp", description: "Découvrez les paysages lunaires du désert d'Agafay, à seulement 40 minutes de Marrakech. Balade en quad, dromadaire ou promenade calme au coucher du soleil.", program: [{time:"08:00",activity:"Départ de votre hôtel à Marrakech"},{time:"08:45",activity:"Arrivée au désert d'Agafay"},{time:"09:00",activity:"Balade en dromadaire dans les paysages rocheux"},{time:"10:30",activity:"Pause thé et pâtisseries dans un bivouac"},{time:"11:00",activity:"Activité au choix : quad ou promenade"},{time:"12:30",activity:"Déjeuner traditionnel marocain (optionnel)"},{time:"13:00",activity:"Retour à Marrakech"}], included: ["Transport", "Guide francophone", "Dromadaire", "Thé"], notIncluded: ["Déjeuner", "Quad (optionnel +20 €)", "Boissons"], rating: 4.9, reviews: 428, available: true },
  { name: "Atlas & Cascades d'Ouzoud", city: "Marrakech", duration: "Journée complète", durationHours: 10, price: 550, difficulty: "Modéré", image: "images/excursions/atlas-ouzoud/main.jpg", description: "Journée inoubliable dans l'Atlas marocain avec visite des magnifiques Cascades d'Ouzoud, les plus hautes du Maroc.", program: [{time:"07:00",activity:"Départ de Marrakech"},{time:"09:30",activity:"Arrêt dans un village berbère de l'Atlas"},{time:"11:00",activity:"Arrivée aux Cascades d'Ouzoud"},{time:"11:30",activity:"Randonnée autour des cascades"},{time:"13:00",activity:"Déjeuner avec vue"},{time:"15:00",activity:"Observation des singes et baignade"},{time:"17:00",activity:"Retour à Marrakech"}], included: ["Transport", "Guide", "Randonnée"], notIncluded: ["Déjeuner"], rating: 4.9, reviews: 459, available: true }
];

const TRANSFER_DATA = [
  { name: "Aéroport Menara → Hôtel / Riad / Villa", city: "Marrakech", duration: "≈ 30 min", durationHours: 1, price: 500, vehicle: "Mercedes Vito", image: "images/transfers/airport-arrival/main.webp", description: "Transfert privé en Mercedes Vito depuis l'aéroport Marrakech Menara vers votre hôtel, riad ou villa à Marrakech.", program: [{time:"00:00",activity:"Accueil à l'aéroport Marrakech Menara avec pancarte"},{time:"00:10",activity:"Installation des bagages à bord de la Mercedes Vito"},{time:"00:15",activity:"Départ vers votre hôtel, riad ou villa"},{time:"00:45",activity:"Arrivée et dépose à votre hébergement à Marrakech"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Pancarte à l'aéroport"], notIncluded: ["Péages", "Attente supplémentaire"], rating: 4.9, reviews: 412, available: true },
  { name: "Hôtel / Riad / Villa → Aéroport Menara", city: "Marrakech", duration: "≈ 30 min", durationHours: 1, price: 500, vehicle: "Mercedes Vito", image: "images/transfers/airport-departure/main.webp", description: "Transfert privé en Mercedes Vito depuis votre hôtel, riad ou villa à Marrakech vers l'aéroport Marrakech Menara.", program: [{time:"00:00",activity:"Prise en charge à votre hôtel, riad ou villa"},{time:"00:10",activity:"Installation des bagages"},{time:"00:15",activity:"Départ vers l'aéroport Marrakech Menara"},{time:"00:45",activity:"Arrivée et dépose au terminal de l'aéroport"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Ponctualité garantie"], notIncluded: ["Péages", "Attente supplémentaire"], rating: 4.9, reviews: 389, available: true },
  { name: "Marrakech → Casablanca Centre-ville", city: "Casablanca", duration: "≈ 3h", durationHours: 3, price: 2500, vehicle: "Mercedes Vito", image: "images/transfers/casablanca/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers le centre-ville de Casablanca.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Sortie de Marrakech vers l'autoroute A3"},{time:"02:30",activity:"Traversée des plaines de la Chaouia"},{time:"03:00",activity:"Arrivée au centre-ville de Casablanca"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.8, reviews: 276, available: true },
  { name: "Marrakech → Aéroport Mohammed V", city: "Casablanca", duration: "≈ 3h", durationHours: 3, price: 2000, vehicle: "Mercedes Vito", image: "images/transfers/casablanca-airport/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers l'aéroport international Mohammed V de Casablanca.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Départ sur l'autoroute A3"},{time:"02:30",activity:"Approche de l'aéroport Mohammed V"},{time:"03:00",activity:"Dépose au terminal de départ"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Ponctualité garantie"], notIncluded: ["Péages", "Attente supplémentaire"], rating: 4.8, reviews: 244, available: true },
  { name: "Marrakech → Rabat", city: "Rabat", duration: "≈ 3h30", durationHours: 4, price: 3500, vehicle: "Mercedes Vito", image: "images/transfers/rabat/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers la capitale Rabat.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Départ sur l'autoroute A3 vers Casablanca"},{time:"02:30",activity:"Contournement de Casablanca"},{time:"03:30",activity:"Arrivée à Rabat, dépose à votre destination"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.8, reviews: 198, available: true },
  { name: "Marrakech → Essaouira", city: "Essaouira", duration: "≈ 2h30", durationHours: 3, price: 1500, vehicle: "Mercedes Vito", image: "images/transfers/essaouira/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers la cité des alizés, Essaouira.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Traversée de la plaine du Haouz"},{time:"01:30",activity:"Forêt d'arganiers et villages berbères"},{time:"02:30",activity:"Arrivée à Essaouira"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.9, reviews: 331, available: true },
  { name: "Marrakech → Ouarzazate", city: "Ouarzazate", duration: "≈ 4h", durationHours: 4, price: 2500, vehicle: "Mercedes Vito", image: "images/transfers/ouarzazate/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers Ouarzazate, porte du désert.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Montée vers le col du Tizi n'Tichka"},{time:"02:00",activity:"Paysages du Haut Atlas"},{time:"04:00",activity:"Arrivée à Ouarzazate"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.8, reviews: 215, available: true },
  { name: "Marrakech → Imlil (Atlas)", city: "Atlas / Imlil", duration: "≈ 1h30", durationHours: 2, price: 800, vehicle: "Mercedes Vito", image: "images/transfers/imlil/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers Imlil, au cœur du Haut Atlas.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:20",activity:"Départ vers le Haut Atlas"},{time:"01:00",activity:"Traversée des villages berbères"},{time:"01:30",activity:"Arrivée à Imlil"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.9, reviews: 287, available: true },
  { name: "Marrakech → Désert d'Agafay", city: "Agafay", duration: "≈ 1h", durationHours: 1, price: 700, vehicle: "Mercedes Vito", image: "images/transfers/agafay/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers le désert d'Agafay.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:15",activity:"Départ vers les collines d'Agafay"},{time:"00:45",activity:"Entrée dans le désert d'Agafay"},{time:"01:00",activity:"Arrivée à votre campement ou lodge"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.9, reviews: 356, available: true },
  { name: "Marrakech → Agadir", city: "Agadir", duration: "≈ 5h", durationHours: 5, price: 3000, vehicle: "Mercedes Vito", image: "images/transfers/agadir/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers Agadir et sa baie.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Départ sur l'autoroute A7"},{time:"03:00",activity:"Traversée de l'Anti-Atlas et d'Essaouira"},{time:"05:00",activity:"Arrivée à Agadir"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.8, reviews: 173, available: true },
  { name: "Marrakech → Fès", city: "Fès", duration: "≈ 6h", durationHours: 6, price: 5000, vehicle: "Mercedes Vito", image: "images/transfers/fes/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers la cité spirituelle de Fès.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Départ sur l'autoroute vers Casablanca"},{time:"03:00",activity:"Contournement de Casablanca puis Rabat"},{time:"06:00",activity:"Arrivée à Fès"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.9, reviews: 302, available: true },
  { name: "Marrakech → El Jadida", city: "El Jadida", duration: "≈ 3h", durationHours: 3, price: 2800, vehicle: "Mercedes Vito", image: "images/transfers/el-jadida/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers El Jadida, cité fortifiée de la côte atlantique.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Départ sur l'autoroute A3"},{time:"02:30",activity:"Traversée des plaines côtières"},{time:"03:00",activity:"Arrivée à El Jadida"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.8, reviews: 154, available: true },
  { name: "Marrakech → Oualidia", city: "Oualidia", duration: "≈ 3h", durationHours: 3, price: 2800, vehicle: "Mercedes Vito", image: "images/transfers/oualidia/main.webp", description: "Transfert privé en Mercedes Vito de Marrakech vers Oualidia, la lagune aux huîtres.", program: [{time:"00:00",activity:"Prise en charge à votre adresse à Marrakech"},{time:"00:30",activity:"Départ sur l'autoroute vers le littoral"},{time:"02:30",activity:"Traversée des plaines côtières"},{time:"03:00",activity:"Arrivée à Oualidia"}], included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"], notIncluded: ["Péages", "Attente sur place"], rating: 4.8, reviews: 141, available: true }
];

const PACK_DATA = [
  { name: "Pack City Escape", badge: "Best-seller", tagline: "Parfait pour un court séjour.", description: "Idéal pour un week-end ou un court séjour à Marrakech : votre voiture, votre appartement confortable et votre transfert aéroport aller / retour.", duration: "3 jours / 2 nuits", durationDays: 3, price: 2490, vehicle: "Renault Clio 5", accommodation: "Appartement confortable", image: "images/packs/city-escape/main.webp", images: ["images/packs/city-escape/main.webp"], rating: 4.9, reviews: 320, available: true, includes: [{icon:"fa-car",label:"Renault Clio 5"},{icon:"fa-home",label:"Appartement confortable"},{icon:"fa-plane-arrival",label:"Transfert aéroport aller / retour"},{icon:"fa-headset",label:"Assistance 24h/24"}] },
  { name: "Pack Découverte", badge: "Populaire", tagline: "Découvrez Marrakech en toute liberté.", description: "Explorez Marrakech et ses environs à votre rythme avec un appartement premium, votre voiture et une excursion dans le désert d'Agafay ou la Palmeraie.", duration: "5 jours / 4 nuits", durationDays: 5, price: 4490, vehicle: "Renault Clio 5", accommodation: "Appartement Premium", image: "images/packs/decouverte/main.webp", images: ["images/packs/decouverte/main.webp"], rating: 4.8, reviews: 410, available: true, includes: [{icon:"fa-car",label:"Renault Clio 5"},{icon:"fa-building",label:"Appartement Premium"},{icon:"fa-plane-arrival",label:"Transfert aller / retour"},{icon:"fa-mountain",label:"Excursion Agafay ou Palmeraie"},{icon:"fa-headset",label:"Assistance 24h/24"}] },
  { name: "Pack Famille", badge: "Familles", tagline: "Le meilleur choix pour les familles.", description: "Tout est prévu pour voyager sereinement en famille : un SUV spacieux, un appartement familial confortable, le transfert aéroport et un siège bébé sur demande.", duration: "7 jours / 6 nuits", durationDays: 7, price: 6490, vehicle: "Dacia Duster ou SUV", accommodation: "Appartement Familial", image: "images/packs/famille/main.webp", images: ["images/packs/famille/main.webp"], rating: 4.9, reviews: 265, available: true, includes: [{icon:"fa-car",label:"Dacia Duster ou SUV"},{icon:"fa-users",label:"Appartement Familial"},{icon:"fa-plane-arrival",label:"Transfert aéroport"},{icon:"fa-child",label:"Siège bébé (sur demande)"}] },
  { name: "Pack Premium", badge: "Confort", tagline: "Confort et élégance.", description: "Une expérience raffinée : une Renault Arkana Hybride, un appartement haut standing, un accueil VIP à l'aéroport et la livraison de votre véhicule.", duration: "5 jours", durationDays: 5, price: 7490, vehicle: "Renault Arkana Hybride", accommodation: "Appartement Haut Standing", image: "images/packs/premium/main.webp", images: ["images/packs/premium/main.webp"], rating: 4.9, reviews: 198, available: true, includes: [{icon:"fa-car",label:"Renault Arkana Hybride"},{icon:"fa-building",label:"Appartement Haut Standing"},{icon:"fa-star",label:"Accueil VIP"},{icon:"fa-truck-front",label:"Livraison du véhicule"},{icon:"fa-headset",label:"Assistance Premium"}] },
  { name: "Pack Villa Prestige", badge: "Piscine privée", tagline: "Pour un séjour d'exception.", description: "Le luxe absolu : un SUV ou une Mercedes Vito, une villa avec piscine privée, le transfert aéroport, le ménage régulier et une assistance premium dédiée.", duration: "5 jours", durationDays: 5, price: 12990, vehicle: "SUV ou Mercedes Vito", accommodation: "Villa avec piscine privée", image: "images/packs/villa-prestige/main.webp", images: ["images/packs/villa-prestige/main.webp"], rating: 5.0, reviews: 124, available: true, includes: [{icon:"fa-car",label:"SUV ou Mercedes Vito"},{icon:"fa-water-ladder",label:"Villa avec piscine privée"},{icon:"fa-plane-arrival",label:"Transfert aéroport"},{icon:"fa-broom",label:"Ménage"},{icon:"fa-headset",label:"Assistance Premium"}] },
  { name: "Pack VIP Marrakech", badge: "Signature", tagline: "Une expérience complète.", description: "Le summum du raffinement : véhicule premium, villa de luxe, accueil VIP, deux excursions au choix, réservations dans les meilleurs restaurants et assistance 24h/24.", duration: "7 jours", durationDays: 7, price: 18990, vehicle: "Véhicule Premium", accommodation: "Villa de Luxe", image: "images/packs/vip-marrakech/main.webp", images: ["images/packs/vip-marrakech/main.webp"], rating: 5.0, reviews: 87, available: true, includes: [{icon:"fa-car-side",label:"Véhicule Premium"},{icon:"fa-crown",label:"Villa de Luxe"},{icon:"fa-star",label:"Accueil VIP"},{icon:"fa-mountain",label:"Deux excursions au choix"},{icon:"fa-utensils",label:"Réservation restaurants"},{icon:"fa-headset",label:"Assistance 24h/24"}] },
  { name: "Pack Honeymoon", badge: "Romantique", tagline: "Idéal pour les couples.", description: "Un séjour pensé pour deux : une Renault Clio 5 Automatique, un appartement romantique, le transfert aéroport et une décoration romantique à votre arrivée.", duration: "4 jours", durationDays: 4, price: 4990, vehicle: "Renault Clio 5 Automatique", accommodation: "Appartement Romantique", image: "images/packs/honeymoon/main.webp", images: ["images/packs/honeymoon/main.webp"], rating: 4.9, reviews: 156, available: true, includes: [{icon:"fa-car",label:"Renault Clio 5 Automatique"},{icon:"fa-heart",label:"Appartement Romantique"},{icon:"fa-plane-arrival",label:"Transfert aéroport"},{icon:"fa-rose",label:"Décoration romantique"}] }
];

const REVIEW_DATA = [
  { name: "Sophie M.", location: "Paris, France", rating: 5, text: "Service exceptionnel ! La Mercedes était impeccable et le transfert à l'aéroport parfait. Je recommande vivement VelaroCar.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", service: "Location Voiture", status: "approved" },
  { name: "Abdelilah A.", location: "Marrakech, Maroc", rating: 5, text: "Service exceptionnel ! J'ai réservé une voiture avec une excursion à Ouzoud et tout était parfaitement organisé.", avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=100&q=80", service: "Voiture + Excursion", status: "approved" },
  { name: "Marie-Claire D.", location: "Bruxelles, Belgique", rating: 5, text: "L'excursion dans le Sahara était un rêve devenu réalité. Le bivouac sous les étoiles, le lever de soleil sur les dunes... inoubliable !", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", service: "Excursion Sahara", status: "approved" },
  { name: "Jean-Pierre L.", location: "Lyon, France", rating: 4, text: "Très bon service, moto en parfait état, prix raisonnables.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", service: "Location Moto", status: "approved" },
  { name: "Fatima Z.", location: "Rabat, Maroc", rating: 5, text: "Le Riad dans la médina était un vrai coup de cœur. Architecture magnifique, petit-déjeuner délicieux.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80", service: "Location Maison", status: "approved" },
  { name: "Ahmed B.", location: "Casablanca, Maroc", rating: 5, text: "La villa de la Palmeraie était magnifique. Piscine, jardin, tout était parfait.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", service: "Location Villa", status: "approved" }
];

const DEFAULT_SETTINGS = [
  { key: 'site_name', value: 'VelaroCar', category: 'website' },
  { key: 'site_tagline', value: 'Location Premium à Marrakech', category: 'website' },
  { key: 'default_language', value: 'fr', category: 'website' },
  { key: 'default_currency', value: 'EUR', category: 'website' },
  { key: 'phone', value: '+212 681 11 71 95', category: 'contact' },
  { key: 'whatsapp', value: '+212681117195', category: 'contact' },
  { key: 'email', value: 'velarocars26@gmail.com', category: 'contact' },
  { key: 'address', value: 'Avenue Al Mhamid, Marrakech 40000, Maroc', category: 'contact' },
  { key: 'facebook', value: '#', category: 'social' },
  { key: 'instagram', value: '#', category: 'social' },
  { key: 'tiktok', value: '#', category: 'social' },
  { key: 'youtube', value: '#', category: 'social' },
  { key: 'booking_confirm_mode', value: 'manual', category: 'booking' },
  { key: 'min_rental_duration', value: '1', category: 'booking' },
  { key: 'cancellation_policy', value: 'Annulation gratuite jusqu à 48h avant.', category: 'booking' },
  { key: 'maintenance_mode', value: 'false', category: 'system' }
];

const DEFAULT_LANGUAGES = [
  { code: 'fr', name: 'French', nativeName: 'Français', currency: 'EUR', currencySymbol: '\u20ac', active: true, direction: 'ltr', order: 1 },
  { code: 'en', name: 'English', nativeName: 'English', currency: 'USD', currencySymbol: '$', active: true, direction: 'ltr', order: 2 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', currency: 'EUR', currencySymbol: '\u20ac', active: true, direction: 'ltr', order: 3 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', currency: 'EUR', currencySymbol: '\u20ac', active: true, direction: 'ltr', order: 4 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', currency: 'EUR', currencySymbol: '\u20ac', active: true, direction: 'ltr', order: 5 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', currency: 'EUR', currencySymbol: '\u20ac', active: true, direction: 'ltr', order: 6 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', currency: 'EUR', currencySymbol: '\u20ac', active: true, direction: 'ltr', order: 7 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', currency: 'MAD', currencySymbol: 'DH', active: true, direction: 'rtl', order: 8 }
];

async function seed(force) {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velarocars');
    console.log('Connecté à MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@velarocars.com';
    let admin = await AdminUser.findOne({ email: adminEmail });
    if (!admin) {
      admin = await AdminUser.create({
        name: process.env.ADMIN_NAME || 'VelaroCar Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Admin@2024!',
        role: 'super_admin'
      });
      console.log('Admin créé:', admin.email);
    } else {
      console.log('Admin existe déjà');
    }

    const collections = [
      { model: Car, data: CAR_DATA, label: 'voitures' },
      { model: Motorcycle, data: MOTO_DATA, label: 'motos' },
      { model: Villa, data: VILLA_DATA, label: 'villas' },
      { model: Excursion, data: EXCURSION_DATA, label: 'excursions' },
      { model: Transfer, data: TRANSFER_DATA, label: 'transferts' },
      { model: Pack, data: PACK_DATA, label: 'packs' },
      { model: Review, data: REVIEW_DATA, label: 'avis' }
    ];

    for (const col of collections) {
      if (force) {
        const count = await col.model.countDocuments();
        if (count > 0) {
          await col.model.deleteMany({});
          console.log(count + ' ' + col.label + ' supprimés (reset)');
        }
      }
      if (await col.model.countDocuments() === 0) {
        await col.model.insertMany(col.data);
        console.log(col.data.length + ' ' + col.label + ' importés');
      } else {
        console.log(col.label + ': ' + await col.model.countDocuments() + ' existent déjà');
      }
    }

    for (const s of DEFAULT_SETTINGS) {
      await Settings.findOneAndUpdate({ key: s.key }, { key: s.key, value: s.value, category: s.category }, { upsert: true });
    }
    console.log(DEFAULT_SETTINGS.length + ' paramètres initialisés');

    for (const l of DEFAULT_LANGUAGES) {
      await Language.findOneAndUpdate({ code: l.code }, l, { upsert: true });
    }
    console.log(DEFAULT_LANGUAGES.length + ' langues initialisées');

    console.log('Seed terminé avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('Erreur seed:', err);
    process.exit(1);
  }
}

const force = process.argv.includes('--force');
seed(force);
