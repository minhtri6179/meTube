import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
const app = express();
app.use(express.json());
const port = 3000;

app.post('/process-video', (req, res) => {
  const inputFile = req.body.inputFile;
  const outputFile = req.body.outputFile;

  if (!inputFile || !outputFile) {
    res.status(400).send('Missing inputFile or outputFile');
    return;
  }

  ffmpeg(inputFile)
    .outputOptions('-vf', 'scale=-1:360')
    .on('end', () => {
      console.log('Processing finished successfully');
      res.status(200).send('Video processed successfully');
      return;
    })
    .on('error', (err) => {
      if (err) {
        console.log('Error processing video');
        res.status(500).send('Error processing video');
        return;
      }})
    .save(outputFile);
  
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Video service listening at http://localhost:${port}`)
});
