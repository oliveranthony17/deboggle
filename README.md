<a href="https://deboggle.herokuapp.com/"><strong>DeBoggle</strong></a> is an online game based on one of my favourite board games "Boggle" - a simple yet very addictive word game!

The app was created using the <strong>React</strong> JavaScript framework where the GameBoard component is created by randomly rolling 16 "dice" - each dice is created base on the dice in my physical game at home.

We also have the InputField component which uses state to detect user input. On enter, it uses as iterative function to confirm whether the word is actually on the board (still some work needed to prevent the ability to use a dice twice) and assigns a score based on the length. It also includes a function using a dictionary API to check whether the word is a real word. This then also changes the state of the message displayed and the text box is automatically cleared.

There are future plans to create a backend where users can create a profile, save high scores and compete with friends - similar to the functionality of the very popular game "Wordle".

This is very much a prototype and there are plan to improve the design and make the game feel more fun!

<img width="493" alt="Screenshot 2023-01-28 at 16 58 55" src="https://user-images.githubusercontent.com/108479068/215276400-777a54c0-f76d-4120-aeea-28922bd0abe3.png">
<img width="435" alt="Screenshot 2023-01-28 at 17 00 20" src="https://user-images.githubusercontent.com/108479068/215276455-6ed64121-0c9b-4176-8487-c25ff92a0674.png">
<img width="435" alt="Screenshot 2023-01-28 at 17 00 33" src="https://user-images.githubusercontent.com/108479068/215276463-dc3904c0-b5f1-42c6-8f3b-4f73297186f0.png">
<img width="428" alt="Screenshot 2023-01-28 at 17 01 23" src="https://user-images.githubusercontent.com/108479068/215276487-e2aa2287-0851-44ee-8184-5f728182296b.png">
