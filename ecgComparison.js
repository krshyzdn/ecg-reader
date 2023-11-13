function compareImages() {
    const uploadInput = document.getElementById('uploadInput');
    const resultParagraph = document.getElementById('result');
    const referenceImage = document.getElementById('referenceImage');

    if (!uploadInput.files || uploadInput.files.length === 0) {
        resultParagraph.textContent = 'Please select an image for comparison.';
        return;
    }

    const uploadedImage = uploadInput.files[0];
    const uploadedImageUrl = URL.createObjectURL(uploadedImage);

    const referenceImageUrl = referenceImage.src;

    calculateMSE(uploadedImageUrl, referenceImageUrl)
        .then((mse) => {
            resultParagraph.textContent = `MSE Similarity: ${mse}`;
        })
        .catch((error) => {
            console.error('Error:', error);
            resultParagraph.textContent = 'Error during comparison.';
        });
}

function calculateMSE(imageUrl1, imageUrl2) {
    return new Promise((resolve, reject) => {
        const image1 = new Image();
        const image2 = new Image();

        image1.onload = image2.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const width = image1.width;
            const height = image1.height;

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image1, 0, 0, width, height);
            const imageData1 = ctx.getImageData(0, 0, width, height).data;

            ctx.drawImage(image2, 0, 0, width, height);
            const imageData2 = ctx.getImageData(0, 0, width, height).data;

            let sumSquaredDiff = 0;

            for (let i = 0; i < imageData1.length; i += 4) {
                const diff = imageData1[i] - imageData2[i];
                sumSquaredDiff += diff * diff;
            }

            const mse = sumSquaredDiff / (width * height);
            resolve(mse);
        };

        image1.src = imageUrl1;
        image2.src = imageUrl2;
    });
}
