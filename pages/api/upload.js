import fs from 'fs';
import AWS from "aws-sdk";
import formidable from "formidable";


//Create an s3 client  
const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "fra1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
});

// change the config and turn off bodyparser of the API request
export const config = {
    api: {
        bodyParser: false
    }
};

//Request handlers 
export default async function handler(req, res) {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (!files.demo) {
            res.status(400).send("No file uploaded");
            return;
        }
        try {
            return s3Client.putObject({
                Bucket: process.env.DO_SPACES_BUCKET,
                Key: files.demo.originalFilename,
                Body: fs.createReadStream(files.demo.filepath),
                ACL: "public-read"
            }, async () => res.status(201).send("File Uploaded successfully")
            );
        } catch (e) {
            console.log(e);
            res.status(500).send("Error uploading file");
        }
    });
}
