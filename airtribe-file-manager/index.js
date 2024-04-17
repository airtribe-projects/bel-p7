var fs = require('fs');

function readSyncWriteSync() {
    console.log("Reading and writing to the file synchronously");
    const data = fs.readFileSync('./AFM-source/input.txt', {encoding: 'utf-8', flag: 'r'});

    console.log('Data has been read');
    fs.writeFileSync('./AFM-destination/output.txt', data, {encoding: 'utf-8', flag: 'w'});
    console.log('Reading and writing to the file has finished');
}

function readSyncWriteAsync() {
    console.log("Reading sync and writing to the file asynchronously");
    const data = fs.readFileSync('./AFM-source/input.txt', {encoding: 'utf-8', flag: 'r'});
    console.log('Data has been read');
    fs.writeFile('./AFM-destination/output.txt', data, {encoding: 'utf-8', flag: 'w'}, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log("Writing to the file async has finished");
        }
    });
    console.log('Reading sync and writing to the file async has finished');
}


function readAsyncWriteSync() {
    
    console.log("Reading async and writing to the file synchronously");
    fs.readFile('./AFM-source/input.txt', {encoding: 'utf-8', flag: 'r'}, function(err, data) {
        console.log('Data has been read');
        fs.writeFileSync('./AFM-destination/output.txt', data, {encoding: 'utf-8', flag: 'w'});
        console.log("Writing to the file sync has finished");
    });
    console.log('Reading async and writing to the file sync has finished');
}

function readAsyncWriteAsync() {
    console.log("Reading async and writing to the file asynchronously");
    fs.readFile('./AFM-source/input.txt', {encoding: 'utf-8', flag: 'r'}, function(err, data) {
        console.log('Data has been read');
        fs.writeFile('./AFM-destination/output.txt', data, {encoding: 'utf-8', flag: 'w'}, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log("Writing to the file async has finished");
            }
        });
        console.log('Data has been written');
    });
    console.log('Reading async and writing to the file async has finished');
}


//readSyncWriteSync();
//readSyncWriteAsync();
//readAsyncWriteSync();

readAsyncWriteAsync();
// read sync write sync
// read async write sync 
// read sync write async
// read async write async