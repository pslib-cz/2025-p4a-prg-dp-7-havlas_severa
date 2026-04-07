import { AuctionItem } from "./AuctionItem";
import { Bidder, Logger } from "./Bidder";

// Vytvoření předmětu
const antiqueVase = new AuctionItem("Starožitná váza", 1000);

// Vytvoření dvou sledujících
const bidder1 = new Bidder("Alice");
const bidder2 = new Bidder("Bob");
const logger = new Logger();

// Registrace sledujících
antiqueVase.attach(bidder1);
antiqueVase.attach(bidder2);
antiqueVase.attach(logger);

// Změna ceny (oba zareagují)
antiqueVase.setPrice(1500);

// Odhlášení jednoho sledujícího
antiqueVase.detach(bidder1);

// Znovu změna ceny (zareaguje už pouze ten zbývající)
antiqueVase.setPrice(2000);
