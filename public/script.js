
const URL = "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
document.addEventListener("DOMContentLoaded", () => {
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector("footer"));
  getData();
});

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    console.warn("Intersecting Viewort");
    getData();
  }
}

function getData() {
  let main = document.querySelector("main");
  console.log("Fetch some JSON data");
  fetch(URL)
    .then(response => response.json())
    .then(data=>{

      data.item.forEach(item=>{
        let fig = document.createElement('figure');
        let fc = document.createElement('figurcaption');
        let img = document.createElement('img');
        
        img.src = item.img;
        img.alt = item.name;
        fc.textContent = item.name;
        fig.appendChild(img);
        fig.appendChild(fc);
        main.appendChild(fig);
      })


    })
}


function ResourceItem({ name, length }) {
  return `
    <li>
      <a href="${name}">/${name}</a>
      <sup>${length ? `${length}x` : 'object'}</sup>
    </li>
  `
}

function ResourceList({ db }) {
  return `
    <ul>
      ${Object.keys(db)
        .map((name) =>
          ResourceItem({
            name,
            length: Array.isArray(db[name]) && db[name].length,
          })
        )
        .join('')}
    </ul>
  `
}

function NoResources() {
  return `<p>No resources found</p>`
}

function ResourcesBlock({ db }) {
  return `
    <div>
      <h1>Resources</h1>
      ${Object.keys(db).length ? ResourceList({ db }) : NoResources()}
    </div>
  `
}

window
  .fetch('db')
  .then((response) => response.json())
  .then(
    (db) =>
      (document.getElementById('resources').innerHTML = ResourcesBlock({ db }))
  )

function CustomRoutesBlock({ customRoutes }) {
  const rules = Object.keys(customRoutes)
  if (rules.length) {
    return `
      <div>
        <h1>Custom Routes</h1>
        <table>
          ${rules
            .map(
              (rule) =>
                `<tr>
              <td>${rule}</td>
              <td><code>⇢</code> ${customRoutes[rule]}</td>
            </tr>`
            )
            .join('')}
        </table>
      </div>
    `
  }
}

window
  .fetch('__rules')
  .then((response) => response.json())
  .then(
    (customRoutes) =>
      (document.getElementById('custom-routes').innerHTML = CustomRoutesBlock({
        customRoutes,
      }))
  )
