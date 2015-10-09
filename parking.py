from socketIO_client import SocketIO, LoggingNamespace

with SocketIO('10.48.19.240', 3000, LoggingNamespace) as socketIO:
    socketIO.emit('lot1', {'status':'occupied'})
    socketIO.wait(seconds=1)