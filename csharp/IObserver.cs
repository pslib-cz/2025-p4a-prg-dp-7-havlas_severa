// Obecné rozhraní pro všechny sledující (Zájemce)
public interface IObserver
{
    void Update(string itemName, decimal newPrice);
}

// Obecné rozhraní pro dražený předmět
public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}
