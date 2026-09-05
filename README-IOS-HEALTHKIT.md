# LeefKracht 38.39 – iPhone / Apple Health

De gedeelde `www`-code is dezelfde voor iPhone en Android.

## iOS native
- HealthKit capability vereist.
- Gebruik `native-ios/App.entitlements`.
- Voeg `native-ios/LeefKrachtHealthKitPlugin.swift` toe aan target App.
- Voeg `native-ios/Info.plist-snippet.xml` toe aan Info.plist.
- Leest: stappen, gewicht, rusthartslag, bloeddruk en bloedsuiker.
- Na toestemming kan LeefKracht bij openen/synchroniseren recente Health-data aanvullen.
- Handmatige waarden worden niet zomaar overschreven; Health-stappen die van Apple Health afkomstig zijn mogen wel worden bijgewerkt.

## Back-ups
- Metingen, profiel, lengte, streefgewicht en documenten zitten in de back-up.
- Na wijzigingen wordt automatisch een lokale veiligheidskopie gemaakt (maximaal 5).
- `Back-up maken` maakt daarnaast een extern JSON-bestand met datum en tijd.
- HealthKit-toestemmingen worden nooit uit een back-up overgezet; iOS blijft daarvoor de bron van waarheid.

## Externe back-up opslaan
Op iPhone gebruikt LeefKracht de systeemeigen deel-/bewaarfunctie. Kies daar **Bewaar in Bestanden** en selecteer bijvoorbeeld iCloud Drive of Op mijn iPhone.
