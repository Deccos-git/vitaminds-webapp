import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const saveFile = (file, setState) => {

    console.log(file[0].type)

    const storage = getStorage();
    const storageRef = ref(storage, `posts/${file[0].name}`);

    const uploadTask = uploadBytesResumable(storageRef, file[0]);
  
    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);

            if(file[0].type === "image/jpeg" || file[0].type === "image/png"){
                setState(`<img style="width:80%" src="${downloadURL}">`)
            } else if(file[0].type === "video"){
                setState(
                    `<video width="90%" height="90%" controls autoplay muted>
                        <source src="${downloadURL}">
                    </video>`)
            } else if(file[0].type === "application"){
                setState(
                    `<embed src="${downloadURL}" width="90% height="90%"></embed>`)
            } else {
                setState(downloadURL)
            }
            
            });
        }
    );
}

export default saveFile