// Selecting profile information
const overview = document.querySelector(".overview");
const username = "lianadanae";

const githubUserInfo = async function() {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);

    displayUserInfo(data);
};
githubUserInfo();

const displayUserInfo = function(data) {
const userInfoElement = document.createElement("div");
userInfoElement.classList.add(".user-info");
userInfoElement.innerHTML = `<figure>
<img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

    overview.append(userInfoElement);
};

