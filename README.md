# Webshop_Django_React
 
# Account webshop

## Opis aplikacije

Account webshop je internetska stranica koja omogućuje prodaju računa za
League of Legends. Stranica omogućuje registraciju korisnika i odabir željenog proizvoda. 
Također postoji integracija sa sustovom za plaćanje "PayPal" koji omogućuje jednostavno vođenje financija i izdavanje računa. 

Aplikacija ima dvije vrste korisnika: Admine i korisnike. Admini imaju pristup
svim sadržajima na stranici(Orders,Products,Users) i imaju read/write pristup u sve sadržaje.
Korisnici se registriraju pomoću svoje email adrese na koju im se kasnije automatski
događa dostava kupnjenog računa.

Na početnoj stranici imamo razne ponude računa. Svaki registrirani
korisnik može kupiti bilo koji račun. Nakon odabira računa otvara se nova stranica sa
više informacija o odabranom proizvodu te mogućnost dodavanja proizvoda u košaricu.

Svaki korisnik može urediti svoj profil kroz sučelje za to i dodati osobne
podatke gdje također vidi svoje prijašnje narudžbe.

## Ograničenja

- Anonimni korisnici (ne-ulogirani) imaju read-only pristup. 
  Ne mogu kupovati, ali vide sve sadržaje.
- Registrirani korisnici imaju privilegije koje su opisane gore.
- Admini mogu uređivati sve i vide sve(osim naravno lozinki korisnika). Registracija Admina se vrši unutar
  Django Admin sučelja, te je unutar admin sučelja(Na stranici i Django Admin sučelju) moguće dodati proizovde, uređivati ih itd.

## Persone

Persone podrazumijevaju tipove korisnika iz perspektive dizajna sučelja. Ovisno
koji je cilj određene persone i na kojem dijelu aplikacije se nalaze, mijenjaju
se njihove ovlasti i motivi.

- Admin: Korisnički računi sa admin privilegijama. Imaju pravo pristupa u
  Django Admin dashboard i mogu mijenjati stvari na razini baze. Specijalni
  slučaj Admin persone je SuperAdmin, koji predstavlja korisnički račun kreiran
  pomoću python manage.py createsuperuser naredbe, kako bi se moglo
  pristupiti Django Admin dashboardu. SuperAdmin može sve što i Admin i sve
  funkcionalnosti koje može izvršiti Admin, može i SuperAdmin.
- User: Korisnički račun koji ima pristup svim osnovnim funkacijama webshopa.
- Anon: Visitor stranice koji nije ulogiran.

## Stranice

- HOMEPAGE stranica- osnovna stranica za prikaz prizvoda i informacija o stranici

- CART stranica - košarica 
- LOGIN/REGISTER stranica- stranica za prijavu/registraciju korisnika

- ORDERS stranica- admin only stranica za prikaz svih narduzbi
- ORDER stranica- stranica gdje korisnik vidi stanje svoje narduzbe 
- PLACE ORDER stranica- stranica za potvrdu narudzbe(sadrži osnove informacije o narudzbi)

- PAYMENT stranica- stranica sa integriranim paypal sistemom za placanje 

- PRODUCT stranica- stranica koja prikazuje više informacija o odabranom proizvodu
- PRODUCTS stranica- admin only stranica za prikaz svih proizvoda
- PRODUCT EDIT stranica- admin only stranica za uređivanje informacija o proizvodu

- PROFILE stranica- stranica gdje korisnik vidi svoje narudžbe te može mijenjati svoj nick/email/password
- USERS stranica- admin only stranica za prikaz svih korisnika


# User stories

Svaki Epic user story podjeljen je u više user storyja, kojima su definirane
funkcionalnosti stranice iz perspektive pojedine persone. Svaki User story
ima definiran acceptance criteria koji potvrđuje ispunjavanje tog User storija.
Epic user story je ispunjen kada su ispunjeni svi acceptance kriteriji svih
storija unutra tog Epica.

## Epic 1: Slanje i dohvaćanje podataka sa Django Servera

- S1-1 
  Kao Anon,User,Admin kada pristupim HOMEPAGE stranici moram vidjeti osnovni izgled stranice

  Acceptance criteria: 
  - kreiranje početne homepage rute koristeći REST i static JSON file
  - vizualna potvrda dobivanja podataka na homepage-u

- S1-2
  Kao Anon,User,Admin stranice moram imati informacije o proizvodu, nardudzbi itd.

  Shema baze : https://drawsql.app/mike-6/diagrams/webshop

  Acceptance criteria: 
  - Kreiranje modela za proizvode po priloženoj schemi

- S1-3
  Kao Anon,User,Admin ukoliko ne vidim učitane podatke trebao bi se pojaviti loading naznaka ili error ukoliko je doslo do greske

  Acceptance criteria:
  - Loader, error komponente  


## Epic 2: Funkcionalnost košarice

- S2.1
  Kao user kada odem na PRODUCT stranicu mogu odabrati količinu proizdova i dodati proizvod u košaricu

  Acceptance criteria:
  - User može odbrati količinu proizvoda, zadati pritiskom dugmeta dodati proizvod u košaricu

- S2-2
  Kreiranje CART stranice

  Acceptance criteria: 
  - Dodavanje cart reducera i action funkcije
  - Testiranje state-a korištenjem redux chrome ekstenzije

- S2-3 
  Kao User, kada pristupim PRODUCT stranici, i stisnem "add to cart button"
  odabrani proizvod i količina mi se pojavi u košarici

  Acceptance criteria:
  - Add to card funkcija

- S2-4
  Kao User, kada pristupim CART stranici, mogu vidjeti svoje proizvode u košarici

  Acceptance criteria:
  - CART stranica sa prikazom dinamičkim prikazom pojedinim proizvoda

- S2-5
  Kao User, kada pristupim CART stranici, mogu maknuti proizvod po svome izboru

  Acceptance criteria: 
  - User može maknuti proizvoid iz košarice


## Epic 3: Registracija/prijava korisnika , PROFILE stranica

- S3-1
  Kao Anon, kada pristupim HOMEPAGE stranici, mogu registrirati novi korisnički
  račun, nakon čega me sustav redirecta nazad na HOMEPAGE

  Need: username, email, password

  Acceptance criteria:
  - Anon vidi link na funkcionalnost registracije 
  - Anon može kreirati novi korisnički račun 
  - Anon je redirectan nazad na HOMEPAGE nakon kreiranja računa

- S3-2 
  Kao Anon, kada pristupim HOMEPAGE stranici, mogu se prijaviti u aplikaciju,
  nakon čega me sustav redirect nazad na HOMEPAGE

  Need: ispravan username ili email, password

  Acceptance criteria:
  - Anon vidi link na funkcionalnost za prijavu
  - Anon se može prijaviti 
  - Anon je redirectan nazad na HOMEPAGE nakon prijave

- S3-3
  Kao User, iz bilo kojeg dijela aplikacije, mogu pristupiti PROFILE stranici
  i urediti svoje korisničke podatke

  Acceptance criteria:
  - Link na PROFILE stranicu vidljiv je u bilo kojem dijelu aplikacije
    (navbar)
  - Klik na "Profile" otvara PROFILE stranicu
  - User može promijeniti svoje podatke upisane pri registraciji
  - User ne može pristupiti podacima drugog Usera
  - User ne može promijeniti podatke drugog Usera


## Epic 4: Proces naručivanja

- S4-1 
  Kao user, kada pritisnem "proceed to checkout" button, vidim PAYMENT stranicu za odabir metode placanja

  Acceptance criteria:
  - Integracija Paypal payment sustava
  - Intuitivni način odabira metode plaćanja

- S4-2 
  Kao user, nakon odabira metode vidim PLACE ORDER stranicu na kojoj su sumarizirane osnovne informacije o nadrudzbi

  Acceptance criteria:
  - Member vidi osnovne informacije kao što su shipping email, payment method, ordered items i postoji button za confirm narudzbe

- S4-3
  Kao user, nakon pritiska "Place Order" buttona odlazimo na ORDER stranicu gdje imamo potvrdu shippmenta i placanje te opciju plaćanja sa našom odabranom metodom

  Acceptance criteria:
  - User može platiti svoju nardudzbu korištenjem odabrane payment metode
  - Automatsko osvježavanje payment markera ukoliko je payment prošao

- S4-4
  Kao User, nakon uspješnog plaćanja kupljeni prozivod je automatski dostavljen na registriranu email adresu

  Acceptance criteria: 
  - Automatska dostava kupljenog proizvoda

## Epic 5: Admin funkcionalnosti, ADMIN stranica

- S5-1
  Kao Admin, imam pristup USERS stranici, mogu pregledati sve korisnike i praviti izmjene 
  za pojedinog korisnika, te brisanje korisnika

  Acceptance criteria:
  - Admin vidi link za listu usera
  - Admin može mijenjati korisničke podatke pojedinog korisnika
  - Admin može brisati korisnika

- S5-2
  Kao Admin, mogu dodati nove proizvode, brisati proizvode, te mijenjati podatke o proizvodima

  Acceptance criteria:
  - Admin vidi link na listu proizvoda
  - Admin može dodati novi prizvod
  - Admin može izmijeniti podatke pojedinog proizvoda
  - Admin može obrisati proizvod

- S5-3
  Kao Admin, mogu pristupiti narudžbama i označiti ih kao dostavljenje

  Acceptance criteria:
  - Admin vidi link na listu narudžbi
  - Admin može pregledati pojedinu nadružbu
  - Admin može označiti pojedinu narudžbu kao dostavljenu
























