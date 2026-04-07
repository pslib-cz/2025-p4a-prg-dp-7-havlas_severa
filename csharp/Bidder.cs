using System;

// Konkrétní implementace zájemce (Sledující)
public class Bidder : IObserver
{
    private readonly string _name;

    public Bidder(string name)
    {
        _name = name;
    }

    public void Update(string itemName, decimal newPrice)
    {
        Console.WriteLine($" -> Sledující {_name} byl upozorněn: Nová cena za \"{itemName}\" je {newPrice} Kč.");
    }
}
