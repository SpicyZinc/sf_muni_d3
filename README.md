# sf_muni_d3

This is a simple application for real-time positions of San Francisco's buses and trains (SF Muni).
It uses React (> 16.0.0), d3 (> 5.0.0) and webpack (> 4.0.0) in this application.

Basic features include:
1. First load San Francisco Map with all neighborhoods, arteries, freeways and streets
2. Load all shuttles currently running on the same map
3. Shuttle locations are automatically updated every 15 seconds
4. Hovering over shuttle icon will show a tooltip with text e.g. 'Route name: F-Market & Wharves'
5. Support to filter to only show selected routes' shuttle
6. Multiple selection among all routes, it also support searching and auto-complete in the search box
7. For selected shuttles on map, no every-15-seconds updating feature
8. Reset button to re-initialize map to the starting state

To follow the instructions in the email, I make sure the application functionality work and guarantee code quality first.
Thus, not polish UI much; only used React without Redux

==================================================
HOW TO RUN
1. navigate to the root directory of sf_muni_d3
2. in terminal, run "npm i"
3. in terminal, run "npm run start"
4. in browser, visit "http://localhost:8080/"

Thanks for checking it out.



