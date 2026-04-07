import { Observer } from "./Observer";

// Konkrétní implementace zájemce (Sledující)
export class Bidder implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public update(itemName: string, newPrice: number): void {
        console.log(` -> Sledující ${this.name} byl upozorněn: Nová cena za "${itemName}" je ${newPrice} Kč.`);
    }
}

export class Logger implements Observer {

    constructor() {
    }

    public update(itemName: string, newPrice: number): void {
        console.log(` -> Předmět "${itemName}" je ${newPrice} Kč.`);
    }
}