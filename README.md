# SWM-PotterDB


Built with React Native, Expo and PotterDB API, this project provides an easy way to look up any character from series "Harry Potter".
<br>
_Disclaimer: I have zero past experiences with/related to Harry Potter series, and I don't know anything about it._

### Features

- Character browser, complete with pagination, search and character's details
- Book browser, with book's details and list of its chapters
- Movie browser, with movie's details

### Technical and limitations

I'm afraid that, while technically it may be against project's guidelines, it's necessary to store some resources locally, for example `characters.json`. PotterDB API has, in my opinion, absurdly restrictive rate limit of only 15 requests per minute. Full character list fetch alone takes 50 requests, which makes character search practically impossible. This forces me to store the most important, `id` and `name` in local file. However, the API is still used, for example to fetch character's details.
