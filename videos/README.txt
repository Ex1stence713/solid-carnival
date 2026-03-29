📁 FOLDER VIDEOS - INSTRUKCJA

Jak dodać film na stronę:

1. Wrzuć plik wideo (.mp4, .webm, .mov) do tego folderu (videos/)

2. Otwórz plik script.js w głównym katalogu strony

3. Znajdź tablicę videoList (linia ~20) i dodaj nowy wpis:

   const videoList = [
     { file: 'twoj_film.mp4', title: 'Tytuł filmu', desc: 'Opis filmu' },
     { file: 'kolejny_film.mp4', title: 'Kolejny film', desc: 'Kolejny opis' },
   ];

4. Zapisz plik script.js

5. Odśwież stronę - film pojawi się automatycznie!

PRZYKŁAD:
Jeśli wrzucisz plik "moj_reel.mp4" do folderu videos/,
dodaj w script.js:
{ file: 'moj_reel.mp4', title: 'Mój Reel', desc: 'Najlepszy reel ever' }

WAŻNE:
- Nazwy plików bez polskich znaków i spacji (użyj _ zamiast spacji)
- Pliki wideo powinny być skompresowane (zalecane max 50MB)
- Obsługiwane formaty: MP4, WebM, MOV
