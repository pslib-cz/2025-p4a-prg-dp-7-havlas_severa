import { Observer, Subject } from "./Observer";

// Konkrétní implementace draženého předmětu
export class AuctionItem implements Subject {
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
        for (const observer of this.observers) {
            observer.update(this.name, this.price);
        }
    }

    // Metoda pro změnu ceny - ta spouští notifikaci
    public setPrice(newPrice: number): void {
        console.log(`\n[Systém] Cena předmětu "${this.name}" se mění na ${newPrice} Kč.`);
        this.price = newPrice;
        this.notify();
    }
}
