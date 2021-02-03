const cloudinary = require('cloudinary').v2;

// The original URL of the image I am trying to overlay is the 'UNESCAPED URL', below (ie 'https://cdn.aldi-digital.co.uk//018399430856806-A.jpg?o=ulF9xap2DC0yJt5tWxuSssultr0j&V=hbVF') 
// URL WITH NO SPECIAL CHARACTERS:
let overlayUrl = 'https://i.imgur.com/ohJhcmn.jpg';
// ^ This works fine. 

// UNESCAPED URL:
overlayUrl = 'https://cdn.aldi-digital.co.uk//018399430856806-A.jpg?o=ulF9xap2DC0yJt5tWxuSssultr0j&V=hbVF'
//  ^ this results in the error message: "Invalid transformation component - bz11bEY5eGFwMkRDMHlKdDV0V3h1U3NzdWx0cjBqJlY9aGJWRg==" 
// Note: That string referenced in the error is the base64 encoded string of everything after the `?` character. Not sure if that helps.

// MINIMALLY ESCAPED URL (? REPLACED WITH %3F):
overlayUrl = 'https://cdn.aldi-digital.co.uk//018399430856806-A.jpg%3Fo=ulF9xap2DC0yJt5tWxuSssultr0j&V=hbVF';
// ^ This results in the following error message: "Unknown or invalid layer image https://cdn.aldi-digital.co.uk//018399430856806-A.jpg%253Fo=ulF9xap2DC0yJt5tWxuSssultr0j&V=hbVF of type fetch: Error in loading https://cdn.aldi-digital.co.uk//018399430856806-A.jpg%253Fo=ulF9xap2DC0yJt5tWxuSssultr0j&V=hbVF - 400 Bad Request"
// Note: It appears to have tried to double-escape the %3F 

// BASE 64 ENCODED UNESCAPED URL:
overlayUrl = 'aHR0cHM6Ly9jZG4uYWxkaS1kaWdpdGFsLmNvLnVrLy8wMTgzOTk0MzA4NTY4MDYtQS5qcGc/bz11bEY5eGFwMkRDMHlKdDV0V3h1U3NzdWx0cjBqJlY9aGJWRg==';
// ^ This results in the following error message: ""Unknown or invalid layer image aHR0cHM6Ly9jZG4uYWxkaS1kaWdpdGFsLmNvLnVrLy8wMTgzOTk0MzA4NTY4MDYtQS5qcGc/bz11bEY5eGFwMkRDMHlKdDV0V3h1U3NzdWx0cjBqJlY9aGJWRg== of type fetch: public_id (aHR0cHM6Ly9jZG4uYWxkaS1kaWdpdGFsLmNvLnVrLy8wMTgzOTk0MzA4NTY4MDYtQS5qcGc/bz11bEY5eGFwMkRDMHlKdDV0V3h1U3NzdWx0cjBqJlY9aGJWRg==) is invalid"

// BASE 64 ENCODED MINIMALLY ESCAPED URL:
overlayUrl = 'aHR0cHM6Ly9jZG4uYWxkaS1kaWdpdGFsLmNvLnVrLy8wMTgzOTk0MzA4NTY4MDYtQS5qcGclM0ZvPXVsRjl4YXAyREMweUp0NXRXeHVTc3N1bHRyMGomVj1oYlZG';
// ^ This results in the following error message: "Unknown or invalid layer image aHR0cHM6Ly9jZG4uYWxkaS1kaWdpdGFsLmNvLnVrLy8wMTgzOTk0MzA4NTY4MDYtQS5qcGclM0ZvPXVsRjl4YXAyREMweUp0NXRXeHVTc3N1bHRyMGomVj1oYlZG of type fetch: public_id (aHR0cHM6Ly9jZG4uYWxkaS1kaWdpdGFsLmNvLnVrLy8wMTgzOTk0MzA4NTY4MDYtQS5qcGclM0ZvPXVsRjl4YXAyREMweUp0NXRXeHVTc3N1bHRyMGomVj1oYlZG) is invalid",

const baseImageUrl = 'https://cdn.aldi-digital.co.uk//018399423306701-A.jpg?o=G20scAmMY69fpVAovJg2vr0lP3cj&V=cyOF'
const options = {
  transformation: [
    {
      width: 226,
      height: 119,
      crop: 'fill'
    },
    {
      overlay:
        { url: overlayUrl },
        gravity: 'north_west',
        x: 227,
        width: 226,
        height: 119,
        crop: 'fill'
    }
  ]
}

cloudinary.uploader.upload(baseImageUrl, options, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res)
    }
})
