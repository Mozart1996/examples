import {upload} from './upload.js'
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
   apiKey: "AIzaSyAEWMYsG4fngJzSGN9h8ozbd29SpjLfg4o",
   authDomain: "fe-upload-8c6ec.firebaseapp.com",
   projectId: "fe-upload-8c6ec",
   storageBucket: "fe-upload-8c6ec.appspot.com",
   messagingSenderId: "306465039981",
   appId: "1:306465039981:web:39a9da34d3a231cb1a4164"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload({
   multi: true,
   accept: ['.png', '.jpg', '.jpeg', '.gif'],
   onUpload(files, blocks) {
      files.forEach((file, index) => {
         const ref = storage.ref(`images/${file.name}`)
         const task = ref.put(file)

         task.on('state_changed', snapshot => {
            const percent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
            const block = blocks[index].querySelector('.preview-info-progress')
            block.textContent = percent
            block.style.width = percent
         }, error => {
            console.log('Error: ', error)
         }, () => {
            console.log('Complete')
         })
      })
   }
})