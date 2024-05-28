const fs= require('fs');

const readableStream = fs.createReadStream('./input.txt', 'utf-8');
const writeStream = fs.createWriteStream('./output.txt', 'utf-8');

let i = 0;
readableStream.on('data', (chunk) => {
    console.log(`Recevied chunk of data ${i}`, chunk.length);
    setTimeout(() => {
        writeStream.write(chunk);
    });
    i++;
});

writeStream.on('finish', () => {
    console.log('write operation finished');
});
