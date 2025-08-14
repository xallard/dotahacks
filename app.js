document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("data/heroes.json");
    const data = await response.json();
    const heroesObj = data.DOTAHeroes;

    // Convert into array for sorting
    let heroes = Object.entries(heroesObj).map(([name, stats]) => ({
      name,
      ...stats
    }));

    // Create controls dynamically
    const controlsContainer = document.getElementById("controls");
    const statKeys = Object.keys(heroes[0]).filter(k => k !== "name");

    statKeys.forEach(stat => {
      const control = document.createElement("div");
      control.className = "sort-control";

      const label = document.createElement("span");
      label.textContent = stat;

      const asc = document.createElement("button");
      asc.textContent = "↑";
      asc.className = "sort-btn";
      asc.onclick = () => sortHeroes(stat, true);

      const desc = document.createElement("button");
      desc.textContent = "↓";
      desc.className = "sort-btn";
      desc.onclick = () => sortHeroes(stat, false);

      control.appendChild(label);
      control.appendChild(asc);
      control.appendChild(desc);

      controlsContainer.appendChild(control);
    });

    function sortHeroes(stat, ascending) {
      heroes.sort((a, b) => {
        if (ascending) return a[stat] - b[stat];
        else return b[stat] - a[stat];
      });
      renderList();
    }

    function renderList() {
      const list = document.getElementById("heroList");
      list.innerHTML = "";

      heroes.forEach(hero => {
        const li = document.createElement("li");
        li.className = "hero-item";

        const title = document.createElement("h3");
        title.textContent = hero.name;

        const statsDiv = document.createElement("div");
        statsDiv.className = "hero-stats";

        statKeys.forEach(k => {
          const statLine = document.createElement("div");
          statLine.textContent = `${k}: ${hero[k]}`;
          statsDiv.appendChild(statLine);
        });

        li.appendChild(title);
        li.appendChild(statsDiv);
        list.appendChild(li);
      });
    }

    renderList();
  } catch (err) {
    console.error("Error loading heroes:", err);
  }
});
