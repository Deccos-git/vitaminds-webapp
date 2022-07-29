import Modal from 'react-modal';
import imageIcon from '../../assets/icons/image-icon.png'
import videoIcon from '../../assets/icons/video-icon.png'
import fileIcon from '../../assets/icons/file-icon.png'
import musicIcon from '../../assets/icons/music-icon.png'
import { Editor } from '@tinymce/tinymce-react';
import { useState, useRef } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const TinyMCE = ({setBody}) => {
    const [modalImageOpen, setModalImageOpen] = useState(false);
    const [modalVideoOpen, setModalVideoOpen] = useState(false);
    const [modalFileOpen, setModalFileOpen] = useState(false);
    const [modalMusicOpen, setModalMusicOpen] = useState(false);
    const [progress, setProgress] = useState(0)

    Modal.setAppElement('#root');
    const editorRef = useRef(null);

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const bodyHandler = (e) => {
        if (editorRef.current) {
            setBody(editorRef.current.getContent());
            }
    }

    const imageHandler = (e) => {

        const file = e.target.files[0]

        const fileType = file.type.split("/")

        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
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

            if (editorRef.current) {
                if(fileType[0] === "image"){
                    editorRef.current.insertContent(
                        `
                        <img style="width:80%" src="${downloadURL}">
                        `
                        )
                } else if(fileType[0] === "video"){
                    editorRef.current.insertContent(
                        `
                        <video width="90%" height="90%" controls autoplay muted>
                            <source src="${downloadURL}">
                        </video>
                        `
                    )
                } else if(fileType[0] === "application"){
                    editorRef.current.insertContent(

                        `
                        <a href='${downloadURL}' target="_blank">
                            ${file.name}
                        </a>
                        `
                    )
                } else if(fileType[0] === "audio"){
                    editorRef.current.insertContent(

                        `
                        <audio controls>
                            <source src="${downloadURL}" type="audio/mpeg">
                        </audio>
                        `
                    )
                }
                else {
                    editorRef.current.insertContent(`<div> src=${downloadURL}</div>`);
                }
                }
                })
                .then(() => {
                    closeImageModal()
                    closeVideoModal()
                    closeFileModal()
                    closeMusicModal()
                })

            })
    }

    const closeImageModal = () => {
        setModalImageOpen(false);
      }

    const closeVideoModal = () => {
    setModalVideoOpen(false);
    }

    const closeFileModal = () => {
        setModalFileOpen(false);
    }

    const closeMusicModal = () => {
        setModalMusicOpen(false);
    }


  return (
      <>
        <Modal
        isOpen={modalImageOpen}
        onRequestClose={closeImageModal}
        style={modalStyles}
        contentLabel="Upload file"
        >
        <div className='add-image-container'>
            <img src={imageIcon} alt="" />
            <p>Upload een plaatje</p>
            <p>{progress}% voltooid</p>
            <input onChange={imageHandler} type="file" />
        </div>
        </Modal>
        <Modal
            isOpen={modalVideoOpen}
            onRequestClose={closeVideoModal}
            style={modalStyles}
            contentLabel="Upload file"
        >
        <div className='add-image-container'>
            <img src={videoIcon} alt="" />
            <p>Upload een plaatje video</p>
            <p>{progress}% voltooid</p>
            <input onChange={imageHandler} type="file" />
        </div>
        </Modal>
        <Modal
            isOpen={modalFileOpen}
            onRequestClose={closeFileModal}
            style={modalStyles}
            contentLabel="Upload file"
        >
        <div className='add-image-container'>
            <img src={fileIcon} alt="" />
            <p>Upload een document</p>
            <p>{progress}% voltooid</p>
            <input onChange={imageHandler} type="file" />
        </div>
        </Modal>
        <Modal
            isOpen={modalMusicOpen}
            onRequestClose={closeMusicModal}
            style={modalStyles}
            contentLabel="Upload music"
        >
        <div className='add-image-container'>
            <img src={musicIcon} alt="" />
            <p>Upload een mp3</p>
            <p>{progress}% voltooid</p>
            <input onChange={imageHandler} type="file" />
        </div>
        </Modal>
        <div className="divider">
            <Editor onChange={bodyHandler}
            apiKey="dz1gl9k5tz59z7k2rlwj9603jg6xi0bdbce371hyw3k0auqm"
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
            height: 500,
            menubar: false,
            statusbar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | imageFunction | videoFunction | fileFunction | musicFunction | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            setup: function (editor) {

                editor.ui.registry.addButton('imageFunction', {
                icon: 'image',
                onAction: function (_) {
                    setModalImageOpen(true);
                },
                });

                editor.ui.registry.addButton('videoFunction', {
                    icon: 'embed',
                    onAction: function (_) {
                    setModalVideoOpen(true);
                    },
                });

                editor.ui.registry.addButton('fileFunction', {
                    icon: 'document-properties',
                    onAction: function (_) {
                    setModalFileOpen(true);
                    },
                });

                editor.ui.registry.addButton('musicFunction', {
                    icon: 'arrow-right',
                    onAction: function (_) {
                    setModalMusicOpen(true);
                    },
                });
            },
            content_style: 'body { font-family: Raleway, sans-serif; font-size:14px; color: gray }'
            }}
        />
    </div>
    </>
  )
}

export default TinyMCE