# SWM-PotterDB


Built with React Native, Expo and PotterDB API, this project provides an easy way to look up any character from series "Harry Potter".
<br>
_Disclaimer: I have zero past experiences with/related to Harry Potter series, and I don't know anything about it._

### Features

- Character browser, complete with pagination, search, filtering and character's details
- Book browser, with book's details and list of its chapters
- Movie browser, with movie's details

### Technical (limitations)

While technically it may be against project's guidelines, I'm afraid it's necessary to store **all** character information in a file. Reason being, PotterDB API has absurdly restrictive rate limit of only 900 requests per hour, not to mention limit of 100 characters per one fetch. The fact that there are almost 5000 characters doesn't help at all. 


A solution would be to do these 50 fetches once, then cache results. Unfortunately, minimified JSON with list of all characters weights almost 4MB. From my experiments, I've concluded that `AsyncStorage` gives up somewhere between 600kB and 1.2MB. 

That doesn't change the fact it IS possible to fetch everytime on load. In `_layout.tsx` I've included sample code that may do so. It's commended by default, because in my opinion. It's safer to load characters from JSON. 

Despite all that, I still fetch frequently throughout the project. Even character details are fetched (and not loaded), as at some point, it was necessary to do so. Books and movies, including their details, are all fetched too. 