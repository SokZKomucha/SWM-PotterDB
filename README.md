# SWM-PotterDB


Built with React Native, Expo and PotterDB API, this project provides an easy way to look up any character from series "Harry Potter".
<br>
_Disclaimer: I have zero past experiences with/related to Harry Potter series, and I don't know anything about it._

### Technical

I'm afraid that, while technically it may be against project's guidelines, it's necessary to store some resources locally, for example `characters.json`. PotterDB API has, in my opinion, absurdly restrictive rate limit of only 15 requests per minute. Full character list fetch alone takes 50 requests, which makes character search practically impossible. This forces me to store the most important, `id` and `name` in local file. However, the API is still used, for example to fetch character's details.

### TODO
- Landing page, selection screen
   - Characters
   - Books
   - Movies
   - Spells (optionally)
   - Favourites

- Characters
   - Pagination
      - 25 elements per page
      - Previous, next, any inbetween

   - Elements
      - Click redirects to own details page
      - In form of a card, with image, character's name and button to favourite
      - One column
   
   - Search
      - Click redirects to own details page
      - Search by character's name, using `includes()` 
      - Highlights search query in character's name, eg. "Ha**rry** Potter"
      - Add to favourites option

   - Details
      - Header with character's name and arrow to go back
      - Big character's name, then image, then additional details
      - Link to wiki page
      - Add to favourites option 

- Books
   - Elements
      - Simple page without search option, there are only 7 of them
      - In form of a card, with title and cover
      - Add to favourites option

   - Details
      - Header with book's name and arrow to go back
      - Big book's name, then cover, then list of chapters. Also with redirects to them. Chapter page should contain summary, link to wiki page and option to favourite
      - Book's page should additionally contain wiki link and option to favourite