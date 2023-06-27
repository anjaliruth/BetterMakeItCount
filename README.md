# BetterMakeItCount

I created this porject after being inspored when reading Ali Abldaal's Sunday Snippets on being aware of how much of the time you set yaside for work ends up being productive. 

Ali suggested using a Youtube Video to track how long you've worked for the day, and making sure to start and stop the video whenever you get distracted. THe message here was that simple was better. 

I then wondered if I could create an app that would do this, but give the added nugget of seeing your total time worked for the past week. 


In this app: 
<br/>
1️⃣ You can start and stop the timer to calculate the elapsed time which corresponds to amount of time worked.
2️⃣ A timestamp of when the stop button was clicked will appear with the elapsed time for that session. 
3️⃣ There will be a display of the total amount of work done for that day. 
4️⃣ Once day has passed, you can see the total for the previous day in teh dashboard of total amount of work done each day. forthe past week. 

## What I learned in this project: 
The calculation of time and its display should be separated as much as possible. 
The difference between pure states and derived states. Pure states === user Input while Derived states === calculations based on user Input. Derived states should be stored in variables rather than useState hooks which should be reserved for pure states. 

## Functionalities to add: 
- Music to be played between Start and Stop click so that the user remembers to stop the timer when they get distracted.
- Different timers for different areas in your life. (ie. Work, Gym, Family, Play)
- Dedicated dashboard so that users can compare the amount of time spent on each area for the past day, week, month. 
