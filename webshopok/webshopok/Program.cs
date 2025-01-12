using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

class Program
{
    static string filePath = "alkatreszek.txt";
    static readonly List<string> validCategories = new List<string>
    {
        "CPU", "GPU", "ALAPLAP", "SZÁMÍTÓGÉPHÁZ", "HDD", "SSD", "MONITOR", "EGÉR", "BILLENTYŰZET", "MEMÓRIA"
    };

    static void Main(string[] args)
    {
        Console.WriteLine("Számítógépalkatrész nyilvántartó rendszer");
        while (true)
        {
            Console.WriteLine("\nVálassz az alábbi lehetőségek közül:");
            Console.WriteLine("1. Alkatrész bevitele");
            Console.WriteLine("2. Alkatrész keresése");
            Console.WriteLine("3. Statisztika készítése");
            Console.WriteLine("4. Akciós árak beállítása");
            Console.WriteLine("5. Kilépés");
            Console.Write("Választás: ");
            string choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    BevitAlkatresz();
                    break;
                case "2":
                    Kereses();
                    break;
                case "3":
                    Statisztika();
                    break;
                case "4":
                    AkciosArak();
                    break;
                case "5":
                    return;
                default:
                    Console.WriteLine("Érvénytelen választás!");
                    break;
            }
        }
    }

    static void BevitAlkatresz()
    {
        Console.WriteLine("Választható kategóriák: " + string.Join(", ", validCategories));
        Console.Write("Típus: ");
        string tipus = Console.ReadLine().ToUpper();

        if (!validCategories.Contains(tipus))
        {
            Console.WriteLine("Érvénytelen típus! Csak az előre meghatározott kategóriák használhatók.");
            return;
        }

        Console.Write("Név (pl. Intel Core i5-13600K): ");
        string nev = Console.ReadLine();
        Console.Write("Leírás (pl. 3.5GHz 14-Core): ");
        string leiras = Console.ReadLine();
        Console.Write("Ár (pl. 130000): ");
        string ar = Console.ReadLine();

        string ujAlkatresz = $"{tipus};{nev};{leiras};{ar}";

        if (File.Exists(filePath))
        {
            var alkatreszek = File.ReadAllLines(filePath);
            if (alkatreszek.Any(x => x.Split(';')[0].ToUpper() == tipus &&
                                      x.Split(';')[1].ToUpper() == nev.ToUpper()))
            {
                Console.WriteLine("Ez az alkatrész már létezik az adatbázisban!");
                return;
            }
        }

        File.AppendAllText(filePath, ujAlkatresz + Environment.NewLine);
        Console.WriteLine("Alkatrész hozzáadva.");
    }

    static void Kereses()
    {
        if (!File.Exists(filePath))
        {
            Console.WriteLine("Nincsenek elérhető adatok.");
            return;
        }

        Console.WriteLine("\nKeresési lehetőségek:");
        Console.WriteLine("1. Típus alapján");
        Console.WriteLine("2. Név alapján");
        Console.WriteLine("3. Ár tartomány alapján");
        Console.Write("Választás: ");
        string choice = Console.ReadLine();

        var alkatreszek = File.ReadAllLines(filePath);

        switch (choice)
        {
            case "1":
                Console.Write("Add meg a típust: ");
                string tipus = Console.ReadLine().ToLower();
                var tipusTalalat = alkatreszek
                    .Where(x => x.Split(';')[0].ToLower() == tipus)
                    .ToList();
                KiirTalalatok(tipusTalalat);
                break;

            case "2":
                Console.Write("Add meg a nevet: ");
                string nev = Console.ReadLine().ToLower();
                var nevTalalat = alkatreszek
                    .Where(x => x.Split(';')[1].ToLower().Contains(nev))
                    .ToList();
                KiirTalalatok(nevTalalat);
                break;

            case "3":
                Console.Write("Add meg a minimum árat: ");
                if (!int.TryParse(Console.ReadLine(), out int minAr))
                {
                    Console.WriteLine("Érvénytelen ár!");
                    return;
                }

                Console.Write("Add meg a maximum árat: ");
                if (!int.TryParse(Console.ReadLine(), out int maxAr))
                {
                    Console.WriteLine("Érvénytelen ár!");
                    return;
                }

                var arTalalat = alkatreszek.Where(x =>
                {
                    var ar = int.Parse(x.Split(';')[3]);
                    return ar >= minAr && ar <= maxAr;
                }).ToList();

                KiirTalalatok(arTalalat);
                break;

            default:
                Console.WriteLine("Érvénytelen választás!");
                break;
        }
    }

    static void KiirTalalatok(List<string> talalatok)
    {
        if (talalatok.Count > 0)
        {
            Console.WriteLine("\nTalálatok:");
            talalatok.ForEach(Console.WriteLine);
        }
        else
        {
            Console.WriteLine("Nincs találat.");
        }
    }

    static void Statisztika()
    {
        if (!File.Exists(filePath))
        {
            Console.WriteLine("Nincsenek elérhető adatok.");
            return;
        }

        var alkatreszek = File.ReadAllLines(filePath);

        
        var tipusStatisztika = alkatreszek
            .Select(x => x.Split(';')[0].ToUpper())
            .GroupBy(t => t)
            .Select(g => new { Tipus = g.Key, Db = g.Count() });

        Console.WriteLine("\nÁltalános statisztika:");
        foreach (var tipus in tipusStatisztika)
        {
            Console.WriteLine($"{tipus.Tipus}: {tipus.Db} db");
        }

        
        var gpuGyartok = alkatreszek
            .Where(x => x.Split(';')[0].ToUpper() == "GPU")
            .GroupBy(x => x.Split(';')[1].Split(' ')[0].ToUpper()) 
            .Select(g => new { Gyarto = g.Key, Db = g.Count() });

        Console.WriteLine("\nGPU statisztika gyártók szerint:");
        foreach (var gyarto in gpuGyartok)
        {
            Console.WriteLine($"{gyarto.Gyarto}: {gyarto.Db} db");
        }

        var cpuGyartok = alkatreszek
            .Where(x => x.Split(';')[0].ToUpper() == "CPU")
            .GroupBy(x => x.Split(';')[1].Split(' ')[0].ToUpper())
            .Select(g => new { Gyarto = g.Key, Db = g.Count() });
        Console.WriteLine("\nCPU statisztika gyártók szerint:");
        foreach (var gyarto in cpuGyartok)
        {
            Console.WriteLine($"{gyarto.Gyarto}: {gyarto.Db} db");
        }
    }

    static void AkciosArak()
    {
        if (!File.Exists(filePath))
        {
            Console.WriteLine("Nincsenek elérhető adatok.");
            return;
        }

        Console.Write("Add meg a százalékos kedvezményt (pl. 10): ");
        if (!int.TryParse(Console.ReadLine(), out int szazalek) || szazalek <= 0 || szazalek > 100)
        {
            Console.WriteLine("Érvénytelen százalék!");
            return;
        }

        Console.Write("Típus szerint akarod szűkíteni? (Igen/Nem): ");
        string szures = Console.ReadLine().ToLower();

        List<string> alkatreszek = File.ReadAllLines(filePath).ToList();
        for (int i = 0; i < alkatreszek.Count; i++)
        {
            string[] adatok = alkatreszek[i].Split(';');
            if (szures == "igen")
            {
                Console.Write("Add meg a típust: ");
                string tipus = Console.ReadLine().ToLower();
                if (adatok[0].ToLower() != tipus) continue;
            }

            int ar = int.Parse(adatok[3]);
            ar = ar - (ar * szazalek / 100);
            adatok[3] = ar.ToString();
            alkatreszek[i] = string.Join(";", adatok);
        }

        File.WriteAllLines(filePath, alkatreszek);
        Console.WriteLine("Akciós árak alkalmazva.");
    }
}
