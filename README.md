# souvik_MERN_Cloudinary_imageupload_App
Just made this image uploader app using MERN stack with cloudinary for interview task purpose. Hope you all like it. This is the link of the live app on heroku https://souvikimageuploaderapp.herokuapp.com/

# steps to use the app:-
1) sign up
2) go to login page and login
3) in the dashboard you will see the welcome message with your name included.
4) go to the new uploads page and choose a picture to upload
5) when you choose a picture you will see a preview of it below the upload button.
6) click on the upload btn and wait for the alert message and click ok, the page will reload.
7) you can check the pic that you have uploaded in the my uploads page.
8) click on the image preview link to see a modal popup showing a preview of the pic that you have uploaded.
9) the pic inside the modal popup might take time to popup, dont worry, have patience, chill :)

#The backend is done in NODE/EXPRESS, the frontend is done in REACT, the actual images are getting saved to cloudinary, the details of the upload are getting ssaved to MONGO database

#If you want to run this app you have to first make a clone of it, then create a dot env file in the root directory, inside that you have to put these details:-
ATLAS_URI = you mongo atlas uri
CLOUDINARY_NAME = your cloudinary name
CLOUDINARY_API_KEY = your cloudinary api key
CLOUDINARY_API_SECRET = your cloudinary secret key

#Then you have to do an npm install(in both the root directory and also inside the client directory), then after that, use the command npm run dev to run the app. This command runs the node server and react server together concurrently. Details of how this is done is written in the package.json file and server.js file in the root directory.
