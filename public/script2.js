


document.addEventListener("DOMContentLoaded", () => {
    let options = {
      root: null,
      rootMargins: "0px",
      threshold: 0.5
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector("footer"));
    getData();//Loading Initial Data
  
  });
  function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
      console.warn("something is intersecting with the viewport");
      getData(); //Observing viewport with Intersection Observer
    }
  }
  function getData() {
    
   //fetching data
    let main = document.getElementById("lazy_load");
    console.log("fetch data");
    fetch("https://avatars.dicebear.com/api/avataaars/:a"+Math.random()+".svg")
      .then(response => response.text())
      .then((response) => {
          let fig = document.createElement("figure");
          fig.innerHTML=response;
          main.appendChild(fig);
        
      });
    
  }
  
  
  