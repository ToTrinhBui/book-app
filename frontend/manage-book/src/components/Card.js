import React, { useState, useEffect } from 'react';
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Card(props) {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [imgUrl, setImgUrl] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        release_date: "",
        pages: "",
        genre: "",
        img: "",
    });

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    // Handle input text event and update state
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setImgUrl(url);
                    setFormData({ ...formData, img: url });
                    console.log(percent)
                });
            }
        );
    };

    useEffect(() => {
        if (props.data) {
            console.log(props.data)
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.author && !formData.title && !formData.release_date) {
            alert('Please fill required fields')
        } else {
            props.onSave(formData); // call the function passed as a prop
            console.log(formData)
        }
    };

    useEffect(() => {
        if (props.data) {
            setFormData(props.data)
            setImgUrl(props.data.img)
        }
    }, [props.data])

    return (
        <>
            <div className="container">
                <div className="heading">
                    <h5>EXPLORE YOUR BOOK WORLD</h5>
                    <h2>{props.title}</h2>
                </div>

                <div className='card'>

                    <form id='form-book' onSubmit={handleSubmit} className='left'>
                        <>
                            <div>
                                <label>Tiêu đề <span>*</span>:</label>
                                {props.isChange ?
                                    <input placeholder='Tiêu đề' name='title' required
                                        value={formData.title} onChange={handleInputChange} />
                                    : <p>{formData.title}</p>}
                            </div>
                            <div>
                                <label>Tác giả <span>*</span>:</label>
                                {props.isChange ?
                                    <input placeholder='Tác giả' name='author' required
                                        value={formData.author} onChange={handleInputChange} />
                                    : <p>{formData.author}</p>}
                            </div>
                            <div className='big'>
                                <label>Mô tả về sách:</label>
                                {props.isChange ?
                                    <input placeholder='Mô tả về sách' name='description'
                                        value={formData.description} onChange={handleInputChange} />
                                    : <p>{formData.description}</p>}
                            </div>
                            <div>
                                <label>Ngày phát hành <span>*</span>:</label>
                                {props.isChange ?
                                    <input type="date" placeholder='Ngày phát hành' name='release_date' required
                                        value={formData.release_date} onChange={handleInputChange} />
                                    : <p>{formData.release_date}</p>}
                            </div>
                            <div>
                                <label>Số trang:</label>
                                {props.isChange ?
                                    <input placeholder='Số trang' name='pages'
                                        value={formData.pages} onChange={handleInputChange} />
                                    : <p>{formData.pages}</p>}
                            </div>
                            <div>
                                <label>Thể loại:</label>
                                {props.isChange ? (
                                    <input list="genre" placeholder='Thể loại' name='genre'
                                        value={formData.genre} onChange={handleInputChange} />
                                ) : <p>{formData.pages}</p>}
                                <datalist id="genre">
                                    <option value="Novel" />
                                    <option value="Fiction" />
                                    <option value="Comic" />
                                    <option value="Poem" />
                                    <option value="Non-fiction" />
                                </datalist>
                            </div>
                        </>
                    </form>

                    <form id='upload-img' className='right'>
                        <>
                            {props.isChange &&
                                <input type="button" className='upload' id='upload-img' onClick={handleUpload}
                                    value="Upload" style={{ border: 'none', borderRadius: '0', marginLeft: 'auto', cursor: 'pointer' }} />}
                            <div className='up-img' style={{ backgroundImage: imgUrl ? `url(${imgUrl})` : '' }}>
                                {props.isChange && <input type='file' className='img-input'
                                    onChange={handleChange} accept="image/png, image/jpg, image/gif, image/jpeg"
                                    style={{ border: 'none', margin: '5px' }} />}
                            </div>
                        </>
                    </form>
                </div>

            </div >
        </>
    )
}
