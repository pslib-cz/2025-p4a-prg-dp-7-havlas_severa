# Návrhový vzor Observer (Pozorovatel)

## Co to je?

**Observer** je behaviorální návrhový vzor, ve kterém objekt (nazývaný **Předmět / Subject**) udržuje seznam závislých objektů (nazývaných **Pozorovatelé / Observers**) a automaticky je upozorní při každé změně svého stavu.

Vzor zavádí vztah jeden k mnoha: jeden předmět, mnoho pozorovatelů.

## Jak funguje?

1. **Předmět** uchovává seznam pozorovatelů a nabízí tři metody:
   - `attach` — zaregistruje nového pozorovatele
   - `detach` — odregistruje pozorovatele
   - `notify` — zavolá metodu `update` na všech registrovaných pozorovatelích

2. Každý **Pozorovatel** implementuje metodu `update`, která reaguje na změnu.

3. Když nastane v předmětu něco důležitého (např. změna ceny), zavolá `notify`, které automaticky informuje všechny registrované pozorovatele.

## Struktura

```
     ┌─────────────┐          ┌──────────────┐
     │   Subject   │◄─────────│   Observer   │
     │─────────────│  attach  │──────────────│
     │ attach()    │  detach  │ update()     │
     │ detach()    │          └──────────────┘
     │ notify()    │                 ▲
     └──────┬──────┘                 │
            │ volá update()    ┌─────┴──────┐
            └─────────────────►│  Bidder    │
                               │ (konkrétní)│
                               └────────────┘
```

## Příklad v tomto projektu

Příklad modeluje **aukční systém**:

- `AuctionItem` je Předmět — uchovává aktuální cenu předmětu.
- `Bidder` je Pozorovatel — každý zájemce chce vědět, když se cena změní.
- Při zavolání `setPrice()` / `SetPrice()` jsou všichni registrovaní zájemci okamžitě upozorněni.



## Kdy ho použít?

- Když změna jednoho objektu vyžaduje aktualizaci dalších objektů a nevíte předem, kolik jich bude.
- Když chcete dosáhnout volné vazby (loose coupling) — předmět nezná konkrétní typy svých pozorovatelů.
- Když chcete umožnit dynamické přidávání a odebírání závislostí za běhu programu.
- Typické využití: události v UI frameworcích, systémy real-time oznámení, datové kanály.

## Jak vzor vypadá?

Vzor se skládá ze dvou hlavních rolí:

| Role | Popis |
|---|---|
| **Subject (Předmět)** | Objekt, jehož stav se mění. Udržuje seznam pozorovatelů a volá jejich `update()`. |
| **Observer (Pozorovatel)** | Objekt, který chce být informován o změnách. Implementuje metodu `update()`. |

Klíčové principy:
- Předmět **nezná konkrétní třídu** pozorovatele — zná jen rozhraní `Observer`.
- Pozorovatelé se mohou **kdykoli přihlásit i odhlásit** (`attach` / `detach`).
- Jedno oznámení předmětu automaticky informuje **všechny** přihlášené pozorovatele najednou.

## Kde jsme ho mohli potkat?

Observer je jeden z nejpoužívanějších vzorů v praxi. Setkáváme se s ním například:

- **Steam wishlist** — přidáte hru na wishlist a Steam vás upozorní e-mailem, jakmile je hra ve slevě. Hra = Subject, váš účet = Observer.
- **Hlídací pes v e-shopu** — „Hlídat cenu" u produktu. Jakmile cena klesne, dostanete notifikaci. Produkt = Subject, zákazníci = Observers.
- **Zpravodajský odběr (newsletter)** — přihlásíte se k odběru novinek a redakce vás automaticky informuje o každém novém článku.
- **Události myši a klávesnice v prohlížeči** — `addEventListener('click', handler)` je Observer v praxi. DOM element = Subject, handler = Observer.
- **Sociální sítě** — sledujete (follow) profil a při každém novém příspěvku dostanete oznámení.
- **Monitorování akcií** — aplikace sleduje cenu akcie a upozorní investory při překročení nastavené hranice.

## Podle čeho ho poznáme? (vs. ostatní vzory)

| Vzor | Proč by mohl být zaměněn s Observerem | Klíčový rozdíl |
|---|---|---|
| **Strategy** | Také pracuje s rozhraními a deleguje chování na jiný objekt. | Strategy **mění, jak** objekt něco dělá. Observer **oznamuje, že** se něco stalo. Strategy má jeden aktivní objekt, Observer jich může mít libovolně mnoho. |
| **Command** | Zapouzdřuje akci do objektu; příjemce čeká, až bude akce zavolána. | Command se **spustí explicitně** (někdo ho zavolá). Observer reaguje **automaticky** při změně stavu předmětu. |
| **Decorator** | Také „obaluje" objekt a přidává chování. | Decorator rozšiřuje **funkčnost jednoho objektu**. Observer reaguje na **změny jiného objektu** a může být přidán i odebrán za běhu. |
| **Template Method** | Nadřazená třída volá metody, které podtřídy přepisují — podobné volání `update()`. | Template Method je **pevně daná struktura** — podtřída je předem zapsána v kódu. Observer je **dynamické propojení** — pozorovatele lze přidávat a odebírat za běhu. |


