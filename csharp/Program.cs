// Vytvoření předmětu
var antiqueVase = new AuctionItem("Starožitná váza", 1000);

// Vytvoření dvou sledujících
var bidder1 = new Bidder("Alice");
var bidder2 = new Bidder("Bob");

// Registrace sledujících
antiqueVase.Attach(bidder1);
antiqueVase.Attach(bidder2);

// Změna ceny (oba zareagují)
antiqueVase.SetPrice(1500);

// Odhlášení jednoho sledujícího
antiqueVase.Detach(bidder1);

// Znovu změna ceny (zareaguje už pouze ten zbývající)
antiqueVase.SetPrice(2000);
