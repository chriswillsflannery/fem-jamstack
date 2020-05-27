const firstRepos = async username => {
  const repos = await fetch(
    `https://api.github.com/users/${username}/repos?type=owner&sort=updated`
  )
    .then(res => res.json())
    .catch(err => console.error(err));

  const markup = repos.map(repo => {
    return (`
      <li>
        <a href="${repo.html_url}">${repo.name}</a>
        (✨${repo.stargazers_count})
      </li>
    `);
  }).join('');

  const content = document.getElementById('content');

  content.innerHTML = `<ul>${markup}</ul>`;


}

firstRepos('chriswillsflannery');