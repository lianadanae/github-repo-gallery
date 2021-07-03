// Selecting profile information
const overview = document.querySelector(".overview");
const username = "lianadanae";
const reposListElement = document.querySelector(".repo-list");

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
    gitRepos();
};

const gitRepos = async function() {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);

    repoInfo(repoData);
};

const repoInfo = function(repos) {
for (const repo of repos) {
const repoItem = document.createElement("li");
repoItem.classList.add("repo");
repoItem.innerHTML = `<h3>${repo.name}</h3>`;
reposListElement.append(repoItem);
}
};


