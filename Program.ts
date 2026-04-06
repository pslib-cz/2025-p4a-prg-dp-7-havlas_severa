// 1. Obecné rozhraní pro všechny sledující (Zájemce)
interface Observer {
    // Metoda, kterou předmět zavolá při změně
    update(itemName: string, newPrice: number): void;
}

// 2. Obecné rozhraní pro dražený předmět
interface Subject {
    // Přidání nového zájemce
    attach(observer: Observer): void;
    // Odebrání zájemce
    detach(observer: Observer): void;
    // Upozornění všech zájemců na změnu
    notify(): void;
}

// 3. Konkrétní implementace draženého předmětu
class AuctionItem implements Subject {
    // Pole pro ukládání přihlášených zájemců
    private observers: Observer[] = [];
    private price: number;
    private name: string;

    constructor(name: string, startingPrice: number) {
        this.name = name;
        this.price = startingPrice;
    }

    public attach(observer: Observer): void {
        const isAttached = this.observers.includes(observer);
        if (!isAttached) {
            this.observers.push(observer);
        }
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    }

    public notify(): void {
        // Subjekt projde všechny odběratele a zavolá jejich metodu update
        for (const observer of this.observers) {
            observer.update(this.name, this.price);
        }
    }

    // Metoda pro změnu ceny - ta spouští notifikaci
    public setPrice(newPrice: number): void {
        console.log(`\n[Systém] Cena předmětu "${this.name}" se mění na ${newPrice} Kč.`);
        this.price = newPrice;
        this.notify(); // Po změně ceny ihned informujeme zájemce
    }
}

// 4. Konkrétní implementace zájemce (Sledující)
class Bidder implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public update(itemName: string, newPrice: number): void {
        console.log(` -> Sledující ${this.name} byl upozorněn: Nová cena za "${itemName}" je ${newPrice} Kč.`);
    }
}

// --- 5. Ukázka požadované funkčnosti ---

// Vytvoření předmětu
const antiqueVase = new AuctionItem("Starožitná váza", 1000);

// Vytvoření dvou sledujících
const bidder1 = new Bidder("Alice");
const bidder2 = new Bidder("Bob");

// Registrace sledujících
antiqueVase.attach(bidder1);
antiqueVase.attach(bidder2);

// Změna ceny (oba zareagují)
antiqueVase.setPrice(1500);

// Odhlášení jednoho sledujícího
antiqueVase.detach(bidder1);

// Znovu změna ceny (zareaguje už pouze ten zbývající)
antiqueVase.setPrice(2000);