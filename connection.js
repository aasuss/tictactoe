url = "https://gulabjamun.herokuapp.com";

room = "koi_room_code";

game_code = "game_ka_code";

username = "Bholuram";

var socket = io(url + "?room=" + room + "&game_code=" + game_code);

(function () {
  socket.on("connect", () => {
    console.log("Connected to server!");
  });

  socket.on("data", (data) => {
    onData(data)
  });
})();

function sendData(data) {
  socket.emit("data", data);
}
