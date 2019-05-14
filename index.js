const { exec } = require('child_process');
const sleep = require('util').promisify(setTimeout);
const fileName = process.argv[2];

async function main() {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');
    
    // Creates a client
    const client = new speech.SpeechClient();
    
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        content: audioBytes,
    };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 44100,
        languageCode: 'en-US',
    };
    const request = {
        audio: audio,
        config: config,
    };

    // My AUI (audible user interface)
    exec('say Translating: ');
    await sleep(2000)
    exec('play data/raw.wav');
    
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
    console.log(`Transcription: ${transcription}`);




    exec(`say Google has translated this as: ${transcription}`);
  }

  main().catch(console.error);