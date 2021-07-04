// Selecting profile information
const overview = document.querySelector(".overview");
const username = "lianadanae";
const repoList = document.querySelector(".repo-list");

const repoInfoElement = document.querySelector(".repos");
const repoDataElement = document.querySelector(".repo-data");

const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const githubUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);

    displayUserInfo(data);
};
githubUserInfo();

const displayUserInfo = function (data) {
    const userInfoElement = document.createElement("div");
    userInfoElement.classList.add("user-info");
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

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);

    displayRepos(repoData);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};


repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();

    // Get the languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoDataElement.innerHTML = "";
    repoDataElement.classList.remove("hide");
    repoInfoElement.classList.add("hide");
    button.classList.remove("hide");

    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    repoDataElement.append(div);
};

viewReposButton.addEventListener("click", function () {
    repoInfoElement.classList.remove("hide");
    repoDataElement.classList.add("hide");
    viewReposButton.classList.add("hide");
})

filterInput.addEventListener("input", function (e) {
    const searchInput = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchInput.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});