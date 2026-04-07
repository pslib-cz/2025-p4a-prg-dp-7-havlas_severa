// 1. Obecné rozhraní pro všechny sledující (Zájemce)
export interface Observer {
    // Metoda, kterou předmět zavolá při změně
    update(itemName: string, newPrice: number): void;
}

// 2. Obecné rozhraní pro dražený předmět
export interface Subject {
    // Přidání nového zájemce
    attach(observer: Observer): void;
    // Odebrání zájemce
    detach(observer: Observer): void;
    // Upozornění všech zájemců na změnu
    notify(): void;
}
