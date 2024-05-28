const cluster = require('cluster');
const numCpus = require('os').cpus().length;
const http = require('http');

if (cluster.isMaster) {
    console.log("Master process is running");

    for (let i =0; i< numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worked ${worker.process.id} has exited`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
      }).listen(8000);

      console.log(`Worker ${process.id} is listening on port 8000`);
}