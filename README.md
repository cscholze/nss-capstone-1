# Chart-It
This app was written to solve my problem of having to maintain a binder
full of song charts.  I wanted an easy way to write some lyrics and add
some chords above it.  Where as websites like 'aczhords.com' or
'ultimate-guitar.com' provide a huge database of songs, I wanted
something more personal that I could log into and manage my own personal
library of song charts.

# Technologies
The app is written using AngularJS as a front-end framework, Bootstrap and Sass for
styling, jTab.js and Raphael.js for the chord lookup, Bower to manage
front end dependencies, Font-Awesome icons, and Firebase for data
storage and deployment.

# Using the app
To use the app, navigate a browser to [Chart-It](https://jcsdevnsscapstone1.firebaseapp.com "Chart-It"),
use an email and password to register (used to save user libraries) or
login with existing information.

## View Charts
This is the main view and designed with live performance in mind.  Here
is a simply view of the chart.  At the bottom are two arrows that allow
the user to navigate between charts stored in their library.  One can
also use the search bar in the top left to search for and jump to a
specific chart.

On the right is a chord lookup.  Typing a chord name in this box will
display a fingering diagram if one is available.

## Create Chart
This view allows users to type in a chart to save.  As a frequent
visitor to other chord/tablature websites, I have tried to make this
friendly with copying and pasting text from other websites such as
[Ultimate-Guitar](http://ultimate-guitar.com).  Once satisfied with the
chart, click **Save**.  This app uses browser storage to preserve you
chart before it has been saved should you switch views at any point and
return to finish creation later.  Clicking **Cancel** will erase any text you have
entered.  The app does not save text should you close the window, so
remember to save before closing the app window.

## Find Chart
This view displays a list of all charts added by every user.  To add a
chart to you library, simply click on one the the links.  A modal window
will appear allowing you to preview the app.  Click **Save** to save the
chart to your library, or **Close** to close the window.  Once saved,
the chart will then be available in the **View Charts** view.


## Chord Library
This view is simply a list of all chords in the chord library, but only
for root position.  In **View Charts**, a user can append the chord name
with a colon and number to view alternative fingerings elsewhere on the
neck.  Specific directions are visible under the _chord finder_ on the
**View Charts** page.

## Chord Lookup
