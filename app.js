document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("data/heroes.json");
    const data = await response.json();
    const heroesObj = data.DOTAHeroes;

    // ✅ Properties to display (use final names after renaming)
    const propertiesToDisplay = [
      "health",
      "health_regen",
      "mana",
      "mana_regen",
      "armor",
      "attack_range",
      "attack_speed",
      "attack_time",
      "damage_min",
      "damage_max",
      "movement_speed",
    ];

    // ✅ Rename map
    const toRename = {
      "MovementSpeed": "movement_speed",
      "AttackRange": "attack_range",
      "AttackRate": "attack_time"
    };

    // Convert into array for sorting, renaming + filtering
    let heroes = Object.entries(heroesObj).map(([name, stats]) => {
      let filteredStats = {};
      Object.entries(stats).forEach(([key, value]) => {
        // If property should be renamed
        if (toRename[key]) {
          filteredStats[toRename[key]] = value;
        }
        // If property is kept without renaming
        else if (propertiesToDisplay.includes(key)) {
          filteredStats[key] = value;
        }
      });
      return { name, ...filteredStats };
    });

    // Create controls dynamically only for chosen properties
    const controlsContainer = document.getElementById("controls");

    propertiesToDisplay.forEach(stat => {
      const control = document.createElement("div");
      control.className = "sort-control";

      const label = document.createElement("span");
      label.textContent = stat;

      const asc = document.createElement("button");
      asc.textContent = "↓";
      asc.className = "sort-btn";
      asc.onclick = () => sortHeroes(stat, true);

      const desc = document.createElement("button");
      desc.textContent = "↑";
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

        propertiesToDisplay.forEach(k => {
          const statLine = document.createElement("div");
          statLine.innerHTML = `${k}: <span class="hero-stat-value">${hero[k]}</span>`;
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
