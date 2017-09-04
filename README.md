The intent of this exercise is to build an app/ web page that allows users to find out more about London’s transportation
system.

## Application requirements
Our goal is to build a simple single web page where we can display and search for some information regarding London’s
transport network.

A. The landing page for the app should:
- State the user’s current location coordinates;
- Show existing TFL provided services as a menu:
 - Entries for Tube, Overground, and DLR should have some sort of visual cue to let the user know
immediately if there’s any current disruptions to that service.

B. When clicking on the Tube, DLR or Overground options from the landing page it should present the user with:
- Details on current disruptions or an ok message if none exist;
- Display closest 5 stations if any exist within an 800m radius, sorted from closest to furthest, and showing their
name, distance from the user and available transport modes and available lines from that station. For
example, Lambeth North station should display in some way it has Bus for lines 12, 148, 159, 453, 53, 59, C10,
N109 and N155 and Tube for Bakerloo.

C. When clicking on the Cycle Hire TFL service option from the landing page it should present the user with:
- A search box where the user can type in any text and have returned bike points that match that free text
search.
- It should remember the last 3 searches so the user can quickly click on them to view the results he has
previously searched for, even if the user moves away from this menu option back to the landing page and then
comes back to it (it’s fine to lose the information on a full page refresh such as the browser’s F5).

## API
TFL exposes a powerful and well documented API that allows us to access everything about the way the city
transportation works. The api and documentation can be found at https://api.tfl.gov.uk/and no authentication or api keys
should be required so you can directly invoke the api endpoints to retrieve the information the app needs. We will help
you with the most “obscure” call required for the exercise, this will retrieve all Train\DLR\Tube\Overground stations
within a certain meter radius of given coordinates:
``` GET https://api.tfl.gov.uk/Place?type=NaptanMetroStation,NaptanRailStation&lat=51.505404&lon=-0.109849&radius=200 ```
Everything else should be straightforward and easy enough to understand from the TFL documentation.

## Tech stack and project structure
To achieve our goal, it is mandatory to use ReactJS and ES6 and/ or TypeScript. You have the liberty to use a state
container (we’ve adopted Redux ourselves) and any other tech / libraries that can help you solve the proposed problem.
The focus of this exercise is the result of writing the app, not configuring the environment for it, so we recommend you
use an already configured environment. There are plenty of choices, but we recommend
https://github.com/facebookincubator/create-react-app (CLI that creates a new react app with common dependencies,
build configuration and tests ready to use). If you would like to use TypeScript with create-react-app you just need to pass
the flag scripts-version=react-scripts-ts. It comes with a skeleton initial page and React component, so feel free to write
your exercise against that or change it as you wish.
You should also feel free to use a version control repository such as Github and submit your solution through there if you
prefer.

## UI/UX
Whilst this isn’t indented to be a UX or UI exercise, a small amount of the evaluation will be based on the layout and
design principles applied. Feel free to use any UI library/ components to pretty it up, but the structure of your app, the
React/JS code and practices used will be the main area of focus in our evaluation.
