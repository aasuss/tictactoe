class GameConnection {
  constructor(_gameCode, _username, _roomId) {
    this.url = "https://gulabjamun.herokuapp.com";
    if (!_roomId) {
      this.roomId = makeid(4);
    } else {
      this.roomId = _roomId;
    }
    this.gameCode = _gameCode;
    this.username = _username;

    this.socket = io(
      this.url +
        "?room=" +
        this.roomId +
        "&game_code=" +
        this.gameCode +
        "&username=" +
        this.username
    );

    this.onDataCallback = function (data) {
      console.log("Recived data but 'onData' callback not defined.", data);
    };

    this.socket.on("connect", () => {
      console.log("Connected to server with Id: " + this.roomId);
    });

    this.socket.on("data", this.onDataCallback);
  }

  onData(func) {
    this.onDataCallback = func;
    this.socket.off("data");
    this.socket.on("data", this.onDataCallback);
  }

  sendData(data) {
    this.socket.emit("data", data);
  }
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
