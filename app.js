const allPlayers = () => {
    document.getElementById("player-container").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    const searchValue = document.getElementById("search-box").value;

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    //   console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.player == null);
            if (data.player == null) {
                document.getElementById("spinner").style.display = "block";
            } else {
                showPlayerDetails(data.player);
                document.getElementById("spinner").style.display = "none";
            }
        });
};

function defult() {
    fetch("https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p")
        .then((res) => res.json())
        .then((data) => showPlayerDetails(data.player));
}

defult();


const showPlayerDetails = (players) => {
    for (const player of players) {
        const parent = document.getElementById("player-container");

        const div = document.createElement("div");
        div.innerHTML = `<div class="card border p-5">
          <div class="pro-pic ">
              <img class="w-50" src="${player.strThumb}" alt="">
          </div>
          <h2>Name: ${player.strPlayer}</h2>
          <h5>Country: ${player.strNationality}</h5>
          <p></p>
          <div class="all-button">
              <button  class="delete-btn btn btn-danger">Delete</button>
              <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
          </div>
      </div>`;
        parent.appendChild(div);

        const allDetailsBtn = document.getElementsByClassName("delete-btn");
        console.log(allDetailsBtn);
        for (const button of allDetailsBtn) {
            button.addEventListener("click", (e) => {
                console.log("hello");
                e.target.parentNode.parentNode.style.display = "none";
            });
        }
    }
};

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => setDetails(data.players[0]));
};

const setDetails = (info) => {
    console.log(info.strGender);

    if (info.strGender == "Male") {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";
    } else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }

    document.getElementById("details-container").innerHTML = `
 <div class="player-details">
    <div class="profile-pic w-50 m-auto rounded">
        <img class="w-50" src="${info.strThumb}" alt="">
    </div>
    <h1>Name: ${info.strPlayer}</h1>
    <h3>Country:${info.strNationality} </h3>
    <h4>Gender: ${info.strGender}</h4>
    <p>${info.strDescriptionEN.slice(0, 200)}</p>
</div>`;
};