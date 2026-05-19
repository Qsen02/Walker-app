# Walker app
This is mobile app for tracking your daily steps and water that you drink and measure your heart rate.
# Technologies:
- Backend: Express with Typescript and MongoDB for database.
- Frontend: React Native with Typescript.
# Features
- You can create account in this app.
- You have settings to change your theme (light or dark) and language (Bulgarian or English).
- While you walking you can see how your steps rising and you can set daily purpose for steps. Steps are refreshing every day at midnight. You can see last seven days how much steps you have too.
- You can add how much water you drink daily. Water are refreshing too every day at midnight. You can see last seven days how much water drink too.
- You have profile page that you can edit your profile and password and set another purpose for steps.
- You can measure your heart rate.
# Required software to start the project:
- `MongoDB compass` for database.
- `Typescript` global installed.
- `Ngrok` installed on your computer.
- `Expo go` installed on your mobile phone.
# How to start client and server
- Server: You can start server with command `npm start` and the server is listening on port 3000. Next in another terminal run command `ngrok http 3000` for exposing port 3000 in public URL. Next copy these URL on the console.
- Client: After you copied public URL in `src/api/requester.ts` set variable `host` with value of the public URL. Next in terminal run command `npm start` and you must see QR code in console, with Expo Go scan this code and you must see the mobile app.
- Data: In folder `data` you have test data. You can import these data to MongoDB compass.
# Screenshots
- Home
<img width="720" height="1600" alt="home" src="https://github.com/user-attachments/assets/534e183e-1513-40cf-b16a-a23535d577d6" />

- Steps days
<img width="720" height="1600" alt="steps-days" src="https://github.com/user-attachments/assets/7d48472f-a788-4b4c-8e6c-07041a55ba65" />

- Water
<img width="720" height="1600" alt="water" src="https://github.com/user-attachments/assets/d19033d8-e74f-4abc-91e3-481ef856d0c1" />

- Water days
<img width="720" height="1600" alt="water-days" src="https://github.com/user-attachments/assets/13c3ce55-0068-4e7a-8062-721c866fc541" />

- Pulse measure
<img width="720" height="1600" alt="pulse-measure" src="https://github.com/user-attachments/assets/78e31ea6-e802-44ea-b727-c7d94101472e" />

- Measurements
<img width="720" height="1600" alt="measurements" src="https://github.com/user-attachments/assets/26d3d507-6d7c-4c3b-8950-8662fb1f7b4b" />











