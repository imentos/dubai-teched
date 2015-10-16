from socketIO_client import SocketIO, LoggingNamespace

with SocketIO('10.48.19.240', 3000, LoggingNamespace) as socketIO:
    socketIO.emit('car', [{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100},{'x':10, 'y':10, 'w':100, 'h':100}])
    socketIO.wait(seconds=1)