const Tesseract = require("tesseract.js");
const fs = require("fs");
const jimp = require("jimp");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const ImageDataURI = require("image-data-uri");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
   const imgData = req.body.imgData;

   if (imgData) {
      await ImageDataURI.outputFile(imgData.imageData, "./img/input/input.png");

      const TesseractFunc = async (input, output) => {
         const image = await jimp.read(input);
         const transparent = await jimp.read("./img/tranparent.png");
         await transparent.resize(809, 510, (err) => {
            if (err) {
               throw console.log(err);
            }
            console.log("Başarılı");
         });

         await image
            .resize(809, 510)
            .contrast(0.5)
            .blit(transparent, 0, 0)
            .color([{ apply: "greyscale", params: [100] }], (err) => {
               if (err) throw err;
            })
            .write(output);
         console.log("Image is processed successfully");

         Tesseract.recognize(output, "tur", { logger: (e) => console.log(e) })
            .then(async (result) => {
               var spaceTotal = "",
                  totalText = "";

               const splitLine = result.data.text.split("—");
               splitLine.forEach((text) => (spaceTotal += text));

               const splitSpace = spaceTotal.split("\n");
               console.log(splitSpace);
               splitSpace.forEach((text) => (totalText += text));

               fs.writeFile("./data/test.txt", totalText, (err) => {
                  if (err) {
                     return console.log(err);
                  }
                  res.status(200).json({
                     message: "Gönderme başarılı",
                     testData: {
                        tcno: splitSpace[0],
                        soyad: splitSpace[1],
                        ad: splitSpace[2],
                        dogumYili: splitSpace[3],
                        seriNo: splitSpace[4],
                        sonGecerlilik: splitSpace[5],
                     },
                  });
               });
            })
            .catch((error) => {
               console.log(error);
            });
      };
      TesseractFunc("./img/input/input.png", "./img/output/output.png");
   } else {
      res.status(404).json({ message: "Gönderme başarısız" });
   }
});

const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server live: ${PORT}`);
});
