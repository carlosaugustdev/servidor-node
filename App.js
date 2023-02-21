const express = require('express')//import express
const multer  = require('multer')//import multer
const sharp = require('sharp')//import sharp
const fs = require('fs')
const { Console } = require('console')

const storageStrategy = multer.memoryStorage()
const upload = multer({ storage: storageStrategy})
const app = express()

app.use(express.json())//Converte conteúdo em json

//código que cria o verbo GET para o servidor node
app.get('/', function (req, res) {
  res.send('Hello World GET')
})

//código que cria o verbo POST para o servidor node
app.post('/imagem', upload.single('imagem'), async function (req, res) {
  
  //Processamento e formatação de tamanho da imagem
  const imagem = req.file

  const processImage = sharp(imagem.buffer)

  const resizeImage = processImage.resize(800,200, {
    fit:"contain", background:"#FFF"
  })

  const resizeImageBuffer= await resizeImage.toBuffer()

  fs.writeFileSync('novarota/prova.png', resizeImageBuffer)// converte o conteúdo do buffer em imagem para o fs

  console.log(resizeImageBuffer)

  res.send({resizeImage: resizeImageBuffer})

})

//Definição da porta onde o serviço será disponibilizado no servidor
const PORT  = process.env.PORT || 4000

app.listen(PORT, function(){
  Console.log('Servidor executando na porta', PORT)
})