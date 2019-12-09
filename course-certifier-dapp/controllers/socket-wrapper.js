var ioConnection;

module.exports = {

    setSocketController: function(io) {
        ioConnection = io;
    },

    publishEvent: function(event) {
        ioConnection.emit('solidityEvent', event);
    }

}