using System;
using System.Collections.Generic;

// Konkrétní implementace draženého předmětu
public class AuctionItem : ISubject
{
    private readonly List<IObserver> _observers = new List<IObserver>();
    private decimal _price;
    private readonly string _name;

    public AuctionItem(string name, decimal startingPrice)
    {
        _name = name;
        _price = startingPrice;
    }

    public void Attach(IObserver observer)
    {
        if (!_observers.Contains(observer))
        {
            _observers.Add(observer);
        }
    }

    public void Detach(IObserver observer)
    {
        _observers.Remove(observer);
    }

    public void Notify()
    {
        foreach (var observer in _observers)
        {
            observer.Update(_name, _price);
        }
    }

    // Metoda pro změnu ceny - ta spouští notifikaci
    public void SetPrice(decimal newPrice)
    {
        Console.WriteLine($"\n[Systém] Cena předmětu \"{_name}\" se mění na {newPrice} Kč.");
        _price = newPrice;
        Notify();
    }
}
