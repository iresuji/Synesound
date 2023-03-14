import React from 'react'

const ImageBanner = () => {
    const imgFile = files.demo.originalFilename;
    const image = new Image();
    const file = imgFile.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
        image.onload = () => {
            const canvas = document.getElementById("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    }
};

export default ImageBanner








