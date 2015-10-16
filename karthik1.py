from socketIO_client import SocketIO, LoggingNamespace

with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
    socketIO.emit('bbox', [{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100}])
    socketIO.wait(seconds=1)