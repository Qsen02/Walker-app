# Walker app
This is mobile app for tracking your daily steps and water that you drink.
# Technologies:
- Backend: Express with Typescript and MongoDB for database.
- Frontend: React Native with Typescript.
# Features
- You can create account in this app.
- You have settings to change your theme (light or dark) and language (Bulgarian or English).
- While you walking you can see how your steps rising and you can set daily purpose for steps. Steps are refreshing every day at midnight. You can see last seven days how much steps you have too.
- You can add how much water you drink daily. Water are refreshing too every day at midnight. You can see last seven days how much water drink too.
- You have profile page that you can edit your profile and password and set another purpose for steps.
# How to start client and server
WARNING: You must have `NGROK` installed on the computer and `Expo Go` on your phone.
- Server: You can start server with command `npm start` and the server is listening on port 3000. Next in another terminal run command `ngrok http 3000` for exposing port 3000 in public URL. Next copy these URL on the console.
- Client: After you copied public URL in `src/api/requester.ts` set variable `host` with value of the public URL. Next in terminal run command `npm start` and you must see QR code in console, with Expo Go scan this code and you must see the mobile app.
# Screenshots
- Home

![51640278-71f5-40ab-97ae-26fc3adc83f3](https://github.com/user-attachments/assets/c1cd9bf9-b723-4c65-8780-7c658b5eada2)
- Settings

![4feaf113-c971-4e22-b653-ea0c087758d6](https://github.com/user-attachments/assets/1add15ae-9801-4301-8d6c-871a034cc2e4)
- Profile

![fdac53fe-99e2-4734-b855-a06c0d1efc2e](https://github.com/user-attachments/assets/9e334a3f-4c21-4746-811e-b1a463e780cf)
- Last 7 days steps

![6fce23e6-4f8d-4454-8fca-5eff4bef8303](https://github.com/user-attachments/assets/aba12746-1505-4a1b-a6eb-7611c4eff692)
- Details for steps

![a23df8bd-df7d-4430-b006-d56b1d6bce7a](https://github.com/user-attachments/assets/f26fe2ed-330e-4d00-ba70-7c29d18a7bb2)
- Details for water 

![45c6f7fa-7a05-4780-a67f-ed27a6adf1c9](https://github.com/user-attachments/assets/0e8dca56-e76a-43c1-9078-3a26009e17e0)
- Last 7 days water

![389f1715-9ee7-4a9c-b1b7-73111eaccc9e](https://github.com/user-attachments/assets/e4b5d6d9-5d0d-4a6d-b281-6e0f3bd1c3c8)





